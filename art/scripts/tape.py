import sys,numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as nd
cut=Image.open(sys.argv[1]); a=np.asarray(cut).astype(int)
r,g,b,al=[a[...,i] for i in range(4)]
H,W=al.shape; ys=np.arange(H)[:,None]
yellow=(r>170)&(g>130)&(b<150)&(r-b>70)&(ys>680)&(ys<830)
mask=np.zeros_like(yellow)
for x in range(W):
    yy=np.where(yellow[:,x])[0]
    if len(yy): mask[yy.min():yy.max()+1,x]=True
# include the light torn paper fringe just outside the yellow (2px)
fr=nd.binary_dilation(mask,iterations=3)&(al>0)&(np.minimum(np.minimum(r,g),b)>190)&(ys>680)&(ys<830)
mask=mask|fr
mask=nd.binary_opening(mask,iterations=1)
lab,n=nd.label(mask); s=nd.sum(mask,lab,range(1,n+1)); mask=lab==(np.argmax(s)+1)
mask=nd.binary_fill_holes(mask)
alpha=Image.fromarray((mask*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
rgb=cut.convert('RGB')
t=rgb.copy(); t.putalpha(alpha); bb=alpha.getbbox(); t=t.crop(bb); t.save(sys.argv[2])
# blank tape: replace dark text pixels with nearest yellow
med=np.median(a[...,:3][mask&yellow],axis=0)
dist=np.sqrt(((a[...,:3]-med)**2).sum(-1))
core=mask&~nd.binary_dilation(~mask,iterations=6)
text=core&(dist>28)
text=nd.binary_dilation(text,iterations=4)&core
src=np.asarray(rgb).copy()
good=mask&~text
_,(iy,ix)=nd.distance_transform_edt(~good,return_indices=True)
fill=src[iy,ix]
out=src.copy(); out[text]=fill[text]
o=Image.fromarray(out.astype(np.uint8))
blur=o.filter(ImageFilter.GaussianBlur(2.5)); ob=np.asarray(blur); out[text]=ob[text]
# add subtle grain back
rng=np.random.default_rng(1); out=out.astype(int); out[text]+=rng.integers(-4,5,size=(text.sum(),1)); out=out.clip(0,255)
bl=Image.fromarray(out.astype(np.uint8)); bl.putalpha(alpha); bl.crop(bb).save(sys.argv[3])
print("tape bbox",bb)
