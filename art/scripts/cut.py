import sys,numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as nd
src,out,prev=sys.argv[1:4]
im=Image.open(src).convert('RGB'); a=np.asarray(im).astype(int)
mn=a.min(2); mx=a.max(2); sat=mx-mn
lo,hi=int(sys.argv[4]),int(sys.argv[5])
cand=(mn>=lo)&(mx<=hi)&(sat<=10)
lab,n=nd.label(cand)
edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0}
bg=np.isin(lab,list(edge))
# remove isolated speckles of non-bg inside bg, fill tiny holes
ys=np.arange(a.shape[0])[:,None]*np.ones((1,a.shape[1]),bool)
cand2=(ys>=int(sys.argv[6]))&(sat<=10)&(mn>=185)
lab3,n3=nd.label(cand2|bg)
seeds=set(np.unique(np.r_[lab3[-1],lab3[int(sys.argv[6]):,0],lab3[int(sys.argv[6]):,-1]]))|set(np.unique(lab3[bg]))
seeds-={0}
bg=np.isin(lab3,list(seeds))&(cand2|bg)
bg=nd.binary_closing(bg,iterations=1)
fg=~bg
fg=nd.binary_opening(fg,iterations=1)
# keep largest fg components (drop specks)
lab2,n2=nd.label(fg); sizes=nd.sum(fg,lab2,range(1,n2+1))
keep=[i+1 for i,s in enumerate(sizes) if s>200]; fg=np.isin(lab2,keep)
alpha=Image.fromarray((fg*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
rgba=im.copy(); rgba.putalpha(alpha); rgba.save(out)
bb=Image.fromarray((fg*255).astype(np.uint8)).getbbox(); print("bbox",bb,"components",len(keep))
# previews on dark + yellow
w,h=im.size; p=Image.new('RGB',(w*2,h),(40,40,40)); p.paste(Image.new('RGB',(w,h),(60,120,200)),(w,0))
p.paste(rgba,(0,0),rgba); p.paste(rgba,(w,0),rgba); p.save(prev)
