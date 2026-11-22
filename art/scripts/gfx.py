import sys,math,subprocess,numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
ART=sys.argv[1]; SRC=sys.argv[2]; OUT=sys.argv[3]
W,H,FPS=576,1152,19
DUR=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",SRC]).decode())
NF=int(round(DUR*FPS))
TAPE=Image.open(ART+"/tape_blank.png").convert("RGBA")
FONT=ART+"/fonts/playfair-display-latin-900-normal.woff"
INK=(20,20,20,255); TILT=3.4

def make_tape(text,size,maxw=500):
    f=ImageFont.truetype(FONT,size)
    track=int(size*0.06)
    def tw(fnt): return sum(fnt.getlength(c) for c in text)+track*(len(text)-1)
    while tw(f)>maxw-2*size*0.7 and size>14: size-=1; f=ImageFont.truetype(FONT,size); track=int(size*0.06)
    w=int(tw(f)+2*size*0.9); h=int(size*1.75)
    flat=TAPE.resize((w+int(h*0.4), int(TAPE.height*(w+int(h*0.4))/TAPE.width)),Image.LANCZOS)
    # tape asset already slanted; build flat strip from its middle by un-rotating
    un=TAPE.rotate(-TILT,resample=Image.BICUBIC,expand=True)
    bb=un.getchannel("A").point(lambda v:255 if v>200 else 0).getbbox()
    strip=un.crop((bb[0]+6,bb[1]+4,bb[2]-6,bb[3]-4))
    # keep torn ends: take left/right ends + stretch middle
    endw=strip.width//8
    L=strip.crop((0,0,endw,strip.height)); R=strip.crop((strip.width-endw,0,strip.width,strip.height)); M=strip.crop((endw,0,strip.width-endw,strip.height))
    sh=h; sc=sh/strip.height
    L=L.resize((max(1,int(L.width*sc)),sh)); R=R.resize((max(1,int(R.width*sc)),sh))
    mw=max(10,w-L.width-R.width); M=M.resize((mw,sh))
    t=Image.new("RGBA",(L.width+mw+R.width,sh)); t.paste(L,(0,0)); t.paste(M,(L.width,0)); t.paste(R,(L.width+mw,0))
    d=ImageDraw.Draw(t)
    x=(t.width-tw(f))/2; asc,desc=f.getmetrics(); y=(sh-(asc+desc))/2+size*0.05
    for c in text:
        d.text((x,y),c,font=f,fill=INK); x+=f.getlength(c)+track
    t=t.rotate(TILT,resample=Image.BICUBIC,expand=True)
    # drop shadow
    pad=12; out=Image.new("RGBA",(t.width+2*pad,t.height+2*pad))
    shadow=Image.new("RGBA",out.size,(0,0,0,0)); a=t.getchannel("A").point(lambda v:int(v*0.45))
    blk=Image.new("RGBA",t.size,(0,0,0,255)); blk.putalpha(a); shadow.paste(blk,(pad+2,pad+4),blk)
    shadow=shadow.filter(ImageFilter.GaussianBlur(4))
    out.alpha_composite(shadow); out.alpha_composite(t,(pad,pad))
    return out

# (text, start, end, font size, centre x, centre y, extra tilt)
CUES=[
 ("HORMON BERUBAH?", 3.40, 5.60, 46, 288, 665, 0),
 ("MEGA RATU",       9.20,11.30, 56, 288, 665, 0),
 ("LEPAS HABIS PANTANG",19.15,21.50,44,288,665,0),
 ("RASA BUAH BERI", 26.50,27.85, 46, 288, 665, 0),
 ("AKAR SERAPAT",   27.90,31.80, 32, 318, 720,-2),
 ("KACIP FATIMAH",  28.50,31.80, 32, 350, 800, 1.5),
 ("JARUM EMAS",     29.60,31.80, 32, 325, 880,-1),
 ("KUNYIT HITAM",   35.00,37.00, 44, 288, 665, 0),
 ("JAGA HORMON",    47.10,49.00, 50, 288, 665, 0),
 ("MEGA RATU",      54.30,DUR,   62, 288, 665, 0),
]
tapes=[make_tape(c[0],c[3]) for c in CUES]
for c,t in zip(CUES,tapes): t.save(f"{ART}/../art/tapes/{c[0].replace(' ','_').replace('?','').lower()}.png") if False else None

IN_S=[1.28,1.12,1.03,1.0]; IN_R=[-3,1.2,-0.4,0]
def frame(i):
    fr=Image.new("RGBA",(W,H)); t=i/FPS
    for c,img in zip(CUES,tapes):
        s,e=c[1],c[2]
        if not (s<=t<e+3/FPS): continue
        k=int(round((t-s)*FPS)); kout=int(round((e-t)*FPS))
        sc,rot,dy,al=1.0,c[6],0,1.0
        if k<len(IN_S): sc=IN_S[k]; rot+=IN_R[k]
        else:
            step=(k//2)%4   # stop-motion wobble on twos
            rot+=[0.0,0.5,0.0,-0.5][step]; dy=[0,-1,0,1][step]
        if t>=e:  # exit: drop + fade over 3 frames
            j=int(round((t-e)*FPS))+1; dy+=14*j; al=max(0,1-j/3); sc*=1-0.03*j
        if e>=DUR-0.01 and t>=e: continue
        im=img
        if sc!=1.0: im=im.resize((max(1,int(im.width*sc)),max(1,int(im.height*sc))),Image.BICUBIC)
        if rot: im=im.rotate(rot,resample=Image.BICUBIC,expand=True)
        if al<1: im.putalpha(im.getchannel("A").point(lambda v:int(v*al)))
        fr.alpha_composite(im,(int(c[4]-im.width/2),int(c[5]-im.height/2+dy)))
    return fr

if len(sys.argv)>4:   # preview stills
    for tt in map(float,sys.argv[4].split(",")): 
        base=Image.open(f"{sys.argv[5]}/f_{tt}.png").convert("RGBA"); base.alpha_composite(frame(int(round(tt*FPS)))); base.convert("RGB").save(f"{sys.argv[5]}/g_{tt}.png")
    sys.exit()
p=subprocess.Popen(["ffmpeg","-v","error","-y","-i",SRC,"-f","rawvideo","-pix_fmt","rgba","-s",f"{W}x{H}","-r",str(FPS),"-i","-",
  "-filter_complex","[0:v][1:v]overlay=0:0:format=auto,format=yuv420p[v]","-map","[v]","-map","0:a",
  "-c:v","libx264","-crf","18","-preset","medium","-c:a","copy","-movflags","+faststart",OUT],stdin=subprocess.PIPE)
for i in range(NF): p.stdin.write(frame(i).tobytes())
p.stdin.close(); p.wait(); print("done",NF,"frames")
