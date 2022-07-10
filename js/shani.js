var shani = [];

function calc_shani ( T )
{
  var x=0,  x1=0,  x2=0,  x3=0,  x4=0,  x5=0;
  var y=0,  y1=0,  y2=0,  y3=0,  y4=0,  y5=0;
  var z=0,  z1=0,  z2=0,  z3=0,  z4=0,  z5=0;
  var i=0;
  
  for (i; i < sx0.length; i++)
  {
     x += sx0[i] * Math.cos(sx0[i+1] + sx0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < sx1.length; i++)
  {
     x1 += sx1[i] * Math.cos(sx1[i+1] + sx1[i+2]*T); i += 2;
  }
  x1 *= T; i=0;
  
  for (i; i < sx2.length; i++)
  {
     x2 += sx2[i] * Math.cos(sx2[i+1] + sx2[i+2]*T); i += 2;
  }
  x2 *= T*T;  i=0;
 
  for (i; i < sx3.length; i++)
  {
     x3 += sx3[i] * Math.cos(sx3[i+1] + sx3[i+2]*T); i += 2;
  }
  x3 *= T*T*T; i=0;
  
  for (i; i < sx4.length; i++)
  {
     x4 += sx4[i] * Math.cos(sx4[i+1] + sx4[i+2]*T); i += 2;
  }
  x4 *= T*T*T*T; i=0;
 
  for (i; i < sx5.length; i++)
  {
     x5 += sx5[i] * Math.cos(sx5[i+1] + sx5[i+2]*T); i += 2;
  }
  x5 *= T*T*T*T*T; i=0;
  
  for (i; i < sy0.length; i++)
  {
     y += sy0[i] * Math.cos(sy0[i+1] + sy0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < sy1.length; i++)
  {
     y1 += sy1[i] * Math.cos(sy1[i+1] + sy1[i+2]*T); i += 2;
  }
  y1 *= T; i=0;
 
  for (var i=0; i < sy2.length; i++)
  {
     y2 += sy2[i] * Math.cos(sy2[i+1] + sy2[i+2]*T); i += 2;
  }
  y2 *= T*T; i=0;
  
  for (i; i < sy3.length; i++)
  {
     y3 += sy3[i] * Math.cos(sy3[i+1] + sy3[i+2]*T); i += 2;
  }
  y3 *= T*T*T; i=0;
 
  for (i; i < sy4.length; i++)
  {
     y4 += sy4[i] * Math.cos(sy4[i+1] + sy4[i+2]*T); i += 2;
  }
  y4 *= T*T*T*T; i=0;
  
  for (i; i < sy5.length; i++)
  {
     y5 += sy5[i] * Math.cos(sy5[i+1] + sy5[i+2]*T); i += 2;
  }
  y5 *= T*T*T*T*T; i=0;
 
  for (i; i < sz0.length; i++)
  {
     z += sz0[i] * Math.cos(sz0[i+1] + sz0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < sz1.length; i++)
  {
     z1 += sz1[i] * Math.cos(sz1[i+1] + sz1[i+2]*T); i += 2;
  }
  z1 *= T; i=0;

  for (i; i < sz2.length; i++)
  {
     z2 += sz2[i] * Math.cos(sz2[i+1] + sz2[i+2]*T); i += 2;
  }
  z2 *= T*T; i=0;
  
  for (i; i < sz3.length; i++)
  {
     z3 += sz3[i] * Math.cos(sz3[i+1] + sz3[i+2]*T); i += 2;
  } 
  z3 *= T*T*T; i=0;
  
  for (i; i < sz4.length; i++)
  {
     z4 += sz4[i] * Math.cos(sz4[i+1] + sz4[i+2]*T); i += 2;
  }
  z4 *= T*T*T*T; i=0;
  
  for (i; i < sz5.length; i++)
  {
     z5 += sz5[i] * Math.cos(sz5[i+1] + sz5[i+2]*T); i += 2;
  }
  z5 *= T*T*T*T*T;
  
  shani[0]=x+x1+x2+x3+x4+x5; // x,
  shani[1]=y+y1+y2+y3+y4+y5; // y,
  shani[2]=z+z1+z2+z3+z4+z5; // z,
}