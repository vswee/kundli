var jupiter = [];

function calc_jupiter ( T )
{
  var x=0,  x1=0,  x2=0,  x3=0,  x4=0,  x5=0;
  var y=0,  y1=0,  y2=0,  y3=0,  y4=0,  y5=0;
  var z=0,  z1=0,  z2=0,  z3=0,  z4=0,  z5=0;
  var i=0;
  
  for (i; i < jx0.length; i++)
  {
     x += jx0[i] * Math.cos(jx0[i+1] + jx0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < jx1.length; i++)
  {
     x1 += jx1[i] * Math.cos(jx1[i+1] + jx1[i+2]*T); i += 2;
  }
  x1 *= T; i=0;
  
  for (i; i < jx2.length; i++)
  {
     x2 += jx2[i] * Math.cos(jx2[i+1] + jx2[i+2]*T); i += 2;
  }
  x2 *= T*T;  i=0;
 
  for (i; i < jx3.length; i++)
  {
     x3 += jx3[i] * Math.cos(jx3[i+1] + jx3[i+2]*T); i += 2;
  }
  x3 *= T*T*T; i=0;
  
  for (i; i < jx4.length; i++)
  {
     x4 += jx4[i] * Math.cos(jx4[i+1] + jx4[i+2]*T); i += 2;
  }
  x4 *= T*T*T*T; i=0;
 
  for (i; i < jx5.length; i++)
  {
     x5 += jx5[i] * Math.cos(jx5[i+1] + jx5[i+2]*T); i += 2;
  }
  x5 *= T*T*T*T*T; i=0;
  
  for (i; i < jy0.length; i++)
  {
     y += jy0[i] * Math.cos(jy0[i+1] + jy0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < jy1.length; i++)
  {
     y1 += jy1[i] * Math.cos(jy1[i+1] + jy1[i+2]*T); i += 2;
  }
  y1 *= T; i=0;
 
  for (var i=0; i < jy2.length; i++)
  {
     y2 += jy2[i] * Math.cos(jy2[i+1] + jy2[i+2]*T); i += 2;
  }
  y2 *= T*T; i=0;
  
  for (i; i < jy3.length; i++)
  {
     y3 += jy3[i] * Math.cos(jy3[i+1] + jy3[i+2]*T); i += 2;
  }
  y3 *= T*T*T; i=0;
 
  for (i; i < jy4.length; i++)
  {
     y4 += jy4[i] * Math.cos(jy4[i+1] + jy4[i+2]*T); i += 2;
  }
  y4 *= T*T*T*T; i=0;
  
  for (i; i < jy5.length; i++)
  {
     y5 += jy5[i] * Math.cos(jy5[i+1] + jy5[i+2]*T); i += 2;
  }
  y5 *= T*T*T*T*T; i=0;
 
  for (i; i < jz0.length; i++)
  {
     z += jz0[i] * Math.cos(jz0[i+1] + jz0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < jz1.length; i++)
  {
     z1 += jz1[i] * Math.cos(jz1[i+1] + jz1[i+2]*T); i += 2;
  }
  z1 *= T; i=0;

  for (i; i < jz2.length; i++)
  {
     z2 += jz2[i] * Math.cos(jz2[i+1] + jz2[i+2]*T); i += 2;
  }
  z2 *= T*T; i=0;
  
  for (i; i < jz3.length; i++)
  {
     z3 += jz3[i] * Math.cos(jz3[i+1] + jz3[i+2]*T); i += 2;
  } 
  z3 *= T*T*T; i=0;
  
  for (i; i < jz4.length; i++)
  {
     z4 += jz4[i] * Math.cos(jz4[i+1] + jz4[i+2]*T); i += 2;
  }
  z4 *= T*T*T*T; i=0;
  
  for (i; i < jz5.length; i++)
  {
     z5 += jz5[i] * Math.cos(jz5[i+1] + jz5[i+2]*T); i += 2;
  }
  z5 *= T*T*T*T*T;
  
  jupiter[0]=x+x1+x2+x3+x4+x5; // x,
  jupiter[1]=y+y1+y2+y3+y4+y5; // y,
  jupiter[2]=z+z1+z2+z3+z4+z5; // z,
}