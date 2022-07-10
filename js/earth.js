var earth = [];

function calc_earth ( T )
{
  var x=0,  x1=0,  x2=0,  x3=0,  x4=0,  x5=0;
  var y=0,  y1=0,  y2=0,  y3=0,  y4=0,  y5=0;
  var z=0,  z1=0,  z2=0,  z3=0,  z4=0,  z5=0;
  var i=0;
  
  for (i; i < ex0.length; i++)
  {
     x += ex0[i] * Math.cos(ex0[i+1] + ex0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < ex1.length; i++)
  {
     x1 += ex1[i] * Math.cos(ex1[i+1] + ex1[i+2]*T); i += 2;
  }
  x1 *= T; i=0;
  
  for (i; i < ex2.length; i++)
  {
     x2 += ex2[i] * Math.cos(ex2[i+1] + ex2[i+2]*T); i += 2;
  }
  x2 *= T*T;  i=0;
 
  for (i; i < ex3.length; i++)
  {
     x3 += ex3[i] * Math.cos(ex3[i+1] + ex3[i+2]*T); i += 2;
  }
  x3 *= T*T*T; i=0;
  
  for (i; i < ex4.length; i++)
  {
     x4 += ex4[i] * Math.cos(ex4[i+1] + ex4[i+2]*T); i += 2;
  }
  x4 *= T*T*T*T; i=0;
 
  for (i; i < ex5.length; i++)
  {
     x5 += ex5[i] * Math.cos(ex5[i+1] + ex5[i+2]*T); i += 2;
  }
  x5 *= T*T*T*T*T; i=0;
  
  for (i; i < ey0.length; i++)
  {
     y += ey0[i] * Math.cos(ey0[i+1] + ey0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < ey1.length; i++)
  {
     y1 += ey1[i] * Math.cos(ey1[i+1] + ey1[i+2]*T); i += 2;
  }
  y1 *= T; i=0;
 
  for (var i=0; i < ey2.length; i++)
  {
     y2 += ey2[i] * Math.cos(ey2[i+1] + ey2[i+2]*T); i += 2;
  }
  y2 *= T*T; i=0;
  
  for (i; i < ey3.length; i++)
  {
     y3 += ey3[i] * Math.cos(ey3[i+1] + ey3[i+2]*T); i += 2;
  }
  y3 *= T*T*T; i=0;
 
  for (i; i < ey4.length; i++)
  {
     y4 += ey4[i] * Math.cos(ey4[i+1] + ey4[i+2]*T); i += 2;
  }
  y4 *= T*T*T*T; i=0;
  
  for (i; i < ey5.length; i++)
  {
     y5 += ey5[i] * Math.cos(ey5[i+1] + ey5[i+2]*T); i += 2;
  }
  y5 *= T*T*T*T*T; i=0;
 
  for (i; i < ez0.length; i++)
  {
     z += ez0[i] * Math.cos(ez0[i+1] + ez0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < ez1.length; i++)
  {
     z1 += ez1[i] * Math.cos(ez1[i+1] + ez1[i+2]*T); i += 2;
  }
  z1 *= T; i=0;

  for (i; i < ez2.length; i++)
  {
     z2 += ez2[i] * Math.cos(ez2[i+1] + ez2[i+2]*T); i += 2;
  }
  z2 *= T*T; i=0;
  
  for (i; i < ez3.length; i++)
  {
     z3 += ez3[i] * Math.cos(ez3[i+1] + ez3[i+2]*T); i += 2;
  } 
  z3 *= T*T*T; i=0;
  
  for (i; i < ez4.length; i++)
  {
     z4 += ez4[i] * Math.cos(ez4[i+1] + ez4[i+2]*T); i += 2;
  }
  z4 *= T*T*T*T; i=0;
  
  for (i; i < ez5.length; i++)
  {
     z5 += ez5[i] * Math.cos(ez5[i+1] + ez5[i+2]*T); i += 2;
  }
  z5 *= T*T*T*T*T;
  
  earth[0]=x+x1+x2+x3+x4+x5; // x,
  earth[1]=y+y1+y2+y3+y4+y5; // y,
  earth[2]=z+z1+z2+z3+z4+z5; // z,
}

export {earth, calc_earth}