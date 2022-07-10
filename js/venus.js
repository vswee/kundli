var venus = [];

function calc_venus ( T )
{
  var x=0,  x1=0,  x2=0,  x3=0,  x4=0,  x5=0;
  var y=0,  y1=0,  y2=0,  y3=0,  y4=0,  y5=0;
  var z=0,  z1=0,  z2=0,  z3=0,  z4=0,  z5=0;
  var i=0;
  
  for (i; i < vx0.length; i++)
  {
     x += vx0[i] * Math.cos(vx0[i+1] + vx0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < vx1.length; i++)
  {
     x1 += vx1[i] * Math.cos(vx1[i+1] + vx1[i+2]*T); i += 2;
  }
  x1 *= T; i=0;
  
  for (i; i < vx2.length; i++)
  {
     x2 += vx2[i] * Math.cos(vx2[i+1] + vx2[i+2]*T); i += 2;
  }
  x2 *= T*T;  i=0;
 
  for (i; i < vx3.length; i++)
  {
     x3 += vx3[i] * Math.cos(vx3[i+1] + vx3[i+2]*T); i += 2;
  }
  x3 *= T*T*T; i=0;
  
  for (i; i < vx4.length; i++)
  {
     x4 += vx4[i] * Math.cos(vx4[i+1] + vx4[i+2]*T); i += 2;
  }
  x4 *= T*T*T*T; i=0;
 
  for (i; i < vx5.length; i++)
  {
     x5 += vx5[i] * Math.cos(vx5[i+1] + vx5[i+2]*T); i += 2;
  }
  x5 *= T*T*T*T*T; i=0;
  
  for (i; i < vy0.length; i++)
  {
     y += vy0[i] * Math.cos(vy0[i+1] + vy0[i+2]*T); i += 2;
  }
  i=0;
  
  for (i; i < vy1.length; i++)
  {
     y1 += vy1[i] * Math.cos(vy1[i+1] + vy1[i+2]*T); i += 2;
  }
  y1 *= T; i=0;
 
  for (var i=0; i < vy2.length; i++)
  {
     y2 += vy2[i] * Math.cos(vy2[i+1] + vy2[i+2]*T); i += 2;
  }
  y2 *= T*T; i=0;
  
  for (i; i < vy3.length; i++)
  {
     y3 += vy3[i] * Math.cos(vy3[i+1] + vy3[i+2]*T); i += 2;
  }
  y3 *= T*T*T; i=0;
 
  for (i; i < vy4.length; i++)
  {
     y4 += vy4[i] * Math.cos(vy4[i+1] + vy4[i+2]*T); i += 2;
  }
  y4 *= T*T*T*T; i=0;
  
  for (i; i < vy5.length; i++)
  {
     y5 += vy5[i] * Math.cos(vy5[i+1] + vy5[i+2]*T); i += 2;
  }
  y5 *= T*T*T*T*T; i=0;
 
  for (i; i < vz0.length; i++)
  {
     z += vz0[i] * Math.cos(vz0[i+1] + vz0[i+2]*T); i += 2;
  }
  i=0;
  
  for (i; i < vz1.length; i++)
  {
     z1 += vz1[i] * Math.cos(vz1[i+1] + vz1[i+2]*T); i += 2;
  }
  z1 *= T; i=0;

  for (i; i < vz2.length; i++)
  {
     z2 += vz2[i] * Math.cos(vz2[i+1] + vz2[i+2]*T); i += 2;
  }
  z2 *= T*T; i=0;
  
  for (i; i < vz3.length; i++)
  {
     z3 += vz3[i] * Math.cos(vz3[i+1] + vz3[i+2]*T); i += 2;
  } 
  z3 *= T*T*T; i=0;
  
  for (i; i < vz4.length; i++)
  {
     z4 += vz4[i] * Math.cos(vz4[i+1] + vz4[i+2]*T); i += 2;
  }
  z4 *= T*T*T*T; i=0;
  
  for (i; i < vz5.length; i++)
  {
     z5 += vz5[i] * Math.cos(vz5[i+1] + vz5[i+2]*T); i += 2;
  }
  z5 *= T*T*T*T*T;
  
  venus[0]=x+x1+x2+x3+x4+x5; // x,
  venus[1]=y+y1+y2+y3+y4+y5; // y,
  venus[2]=z+z1+z2+z3+z4+z5; // z,
}
