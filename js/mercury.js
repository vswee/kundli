var mercury = [];

function calc_mercury ( T )
{
  var x=0,  x1=0,  x2=0,  x3=0,  x4=0,  x5=0;
  var y=0,  y1=0,  y2=0,  y3=0,  y4=0,  y5=0;
  var z=0,  z1=0,  z2=0,  z3=0,  z4=0,  z5=0;
  var i=0;
  
  for (i; i < mex0.length; i++)
  {
     x += mex0[i] * Math.cos(mex0[i+1] + mex0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < mex1.length; i++)
  {
     x1 += mex1[i] * Math.cos(mex1[i+1] + mex1[i+2]*T); i += 2;
  }
  x1 *= T; i=0;
  
  for (i; i < mex2.length; i++)
  {
     x2 += mex2[i] * Math.cos(mex2[i+1] + mex2[i+2]*T); i += 2;
  }
  x2 *= T*T;  i=0;
 
  for (i; i < mex3.length; i++)
  {
     x3 += mex3[i] * Math.cos(mex3[i+1] + mex3[i+2]*T); i += 2;
  }
  x3 *= T*T*T; i=0;
  
  for (i; i < mex4.length; i++)
  {
     x4 += mex4[i] * Math.cos(mex4[i+1] + mex4[i+2]*T); i += 2;
  }
  x4 *= T*T*T*T; i=0;
 
  for (i; i < mex5.length; i++)
  {
     x5 += mex5[i] * Math.cos(mex5[i+1] + mex5[i+2]*T); i += 2;
  }
  x5 *= T*T*T*T*T; i=0;
  
  for (i; i < mey0.length; i++)
  {
     y += mey0[i] * Math.cos(mey0[i+1] + mey0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < mey1.length; i++)
  {
     y1 += mey1[i] * Math.cos(mey1[i+1] + mey1[i+2]*T); i += 2;
  }
  y1 *= T; i=0;
 
  for (var i=0; i < mey2.length; i++)
  {
     y2 += mey2[i] * Math.cos(mey2[i+1] + mey2[i+2]*T); i += 2;
  }
  y2 *= T*T; i=0;
  
  for (i; i < mey3.length; i++)
  {
     y3 += mey3[i] * Math.cos(mey3[i+1] + mey3[i+2]*T); i += 2;
  }
  y3 *= T*T*T; i=0;
 
  for (i; i < mey4.length; i++)
  {
     y4 += mey4[i] * Math.cos(mey4[i+1] + mey4[i+2]*T); i += 2;
  }
  y4 *= T*T*T*T; i=0;
  
  for (i; i < mey5.length; i++)
  {
     y5 += mey5[i] * Math.cos(mey5[i+1] + mey5[i+2]*T); i += 2;
  }
  y5 *= T*T*T*T*T; i=0;
 
  for (i; i < mez0.length; i++)
  {
     z += mez0[i] * Math.cos(mez0[i+1] + mez0[i+2]*T); i += 2;
  }
  i=0;
  for (i; i < mez1.length; i++)
  {
     z1 += mez1[i] * Math.cos(mez1[i+1] + mez1[i+2]*T); i += 2;
  }
  z1 *= T; i=0;

  for (i; i < mez2.length; i++)
  {
     z2 += mez2[i] * Math.cos(mez2[i+1] + mez2[i+2]*T); i += 2;
  }
  z2 *= T*T; i=0;
  
  for (i; i < mez3.length; i++)
  {
     z3 += mez3[i] * Math.cos(mez3[i+1] + mez3[i+2]*T); i += 2;
  } 
  z3 *= T*T*T; i=0;
  
  for (i; i < mez4.length; i++)
  {
     z4 += mez4[i] * Math.cos(mez4[i+1] + mez4[i+2]*T); i += 2;
  }
  z4 *= T*T*T*T; i=0;
  
  for (i; i < mez5.length; i++)
  {
     z5 += mez5[i] * Math.cos(mez5[i+1] + mez5[i+2]*T); i += 2;
  }
  z5 *= T*T*T*T*T;
  
  mercury[0]=x+x1+x2+x3+x4+x5; // x,
  mercury[1]=y+y1+y2+y3+y4+y5; // y,
  mercury[2]=z+z1+z2+z3+z4+z5; // z,
}
