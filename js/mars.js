var mars = [];

function calc_mars ( T )
{
  var x=0,  x1=0,  x2=0,  x3=0,  x4=0,  x5=0;
  var y=0,  y1=0,  y2=0,  y3=0,  y4=0,  y5=0;
  var z=0,  z1=0,  z2=0,  z3=0,  z4=0,  z5=0;
  var i=0;
  
  for (i; i < mx0.length; i++)
  {
     x += mx0[i] * Math.cos(mx0[i+1] + mx0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < mx1.length; i++)
  {
     x1 += mx1[i] * Math.cos(mx1[i+1] + mx1[i+2]*T); i += 2;
  }
  x1 *= T; i=0;
  
  for (i; i < mx2.length; i++)
  {
     x2 += mx2[i] * Math.cos(mx2[i+1] + mx2[i+2]*T); i += 2;
  }
  x2 *= T*T;  i=0;
 
  for (i; i < mx3.length; i++)
  {
     x3 += mx3[i] * Math.cos(mx3[i+1] + mx3[i+2]*T); i += 2;
  }
  x3 *= T*T*T; i=0;
  
  for (i; i < mx4.length; i++)
  {
     x4 += mx4[i] * Math.cos(mx4[i+1] + mx4[i+2]*T); i += 2;
  }
  x4 *= T*T*T*T; i=0;
 
  for (i; i < mx5.length; i++)
  {
     x5 += mx5[i] * Math.cos(mx5[i+1] + mx5[i+2]*T); i += 2;
  }
  x5 *= T*T*T*T*T; i=0;
  
  for (i; i < my0.length; i++)
  {
     y += my0[i] * Math.cos(my0[i+1] + my0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < my1.length; i++)
  {
     y1 += my1[i] * Math.cos(my1[i+1] + my1[i+2]*T); i += 2;
  }
  y1 *= T; i=0;
 
  for (var i=0; i < my2.length; i++)
  {
     y2 += my2[i] * Math.cos(my2[i+1] + my2[i+2]*T); i += 2;
  }
  y2 *= T*T; i=0;
  
  for (i; i < my3.length; i++)
  {
     y3 += my3[i] * Math.cos(my3[i+1] + my3[i+2]*T); i += 2;
  }
  y3 *= T*T*T; i=0;
 
  for (i; i < my4.length; i++)
  {
     y4 += my4[i] * Math.cos(my4[i+1] + my4[i+2]*T); i += 2;
  }
  y4 *= T*T*T*T; i=0;
  
  for (i; i < my5.length; i++)
  {
     y5 += my5[i] * Math.cos(my5[i+1] + my5[i+2]*T); i += 2;
  }
  y5 *= T*T*T*T*T; i=0;
 
  for (i; i < mz0.length; i++)
  {
     z += mz0[i] * Math.cos(mz0[i+1] + mz0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < mz1.length; i++)
  {
     z1 += mz1[i] * Math.cos(mz1[i+1] + mz1[i+2]*T); i += 2;
  }
  z1 *= T; i=0;

  for (i; i < mz2.length; i++)
  {
     z2 += mz2[i] * Math.cos(mz2[i+1] + mz2[i+2]*T); i += 2;
  }
  z2 *= T*T; i=0;
  
  for (i; i < mz3.length; i++)
  {
     z3 += mz3[i] * Math.cos(mz3[i+1] + mz3[i+2]*T); i += 2;
  } 
  z3 *= T*T*T; i=0;
  
  for (i; i < mz4.length; i++)
  {
     z4 += mz4[i] * Math.cos(mz4[i+1] + mz4[i+2]*T); i += 2;
  }
  z4 *= T*T*T*T; i=0;
  
  for (i; i < mz5.length; i++)
  {
     z5 += mz5[i] * Math.cos(mz5[i+1] + mz5[i+2]*T); i += 2;
  }
  z5 *= T*T*T*T*T;
  
  mars[0]=x+x1+x2+x3+x4+x5; // x,
  mars[1]=y+y1+y2+y3+y4+y5; // y,
  mars[2]=z+z1+z2+z3+z4+z5; // z,
}