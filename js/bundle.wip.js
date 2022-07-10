import data from "./data.js"
import {earth, calc_earth} from "./earth.js";





window.onload = generate;

var name,date,time,tz,lat,lon,latdir,londir,lattmp,lontmp,dn,forward=0;

var DEGS = 180/Math.PI;
var RADS = Math.PI/180;
var EPS  = 1.0e-12;

var planets    = [];   
/* D1 zod,house  */
var mygrahas   = []; 
var mybhavas   = [];
var myrashis   = [];
/* D2 zod,house  */
var myhoraz    = [];
var myhorah    = [];
/* D6 zod,house  */
var mysashthamshaz = [];
var mysashthamshah = [];
/* D8 zod,house  */
var myashthamsaz = [];
var myashthamsah = [];
/* D9 zod,house  */
var mynavamsaz = [];
var mynavamsah = []; 
/* D12 zod,house */
var mydwadashamsaz = [];
var mydwadashamsah = []; 

/* Nakshatras    */
var mynaksha   = [];
var mynakshal  = [];
var mynakshap  = [];

var index      = [ 2,2,6,6,8,8,9,9,12,12 ];
var division   = [ myhoraz,myhorah,mysashthamshaz,mysashthamshah,
                   myashthamsaz,myashthamsah,mynavamsaz,mynavamsah,
                   mydwadashamsaz,mydwadashamsah ];
   
/* Planets or Grahas */
var AS    = 0;  /* Ascendant or Lagna  */
var SU    = 1;  /* Sun     Surya      (Leo)                  South 7th          Sunday     6Y 29D     */
var MO    = 2;  /* Moon    Chandra    (Cancer)               North 7th          Monday    10Y 2D      */
var MA    = 3;  /* Mars    Mangala    (Aries+, Scorpio)      South 4th,7th,8th  Tuesday    7Y 2M5D    */
var ME    = 4;  /* Mercury Budha      (Virgo+, Gemini)       East  7th          Wednesday 17Y 2M9D    */
var JU    = 5;  /* Jupiter Brihaspati (Sagittarius+, Pisces) East  5th,7th,9th  Thursday  16Y 1Y1M11D */
var VE    = 6;  /* Venus   Shukra     (Libra+, Taurus)       North 7th          Friday    20Y 25D     */
var SA    = 7;  /* Saturn  Shani      (Aquarius+,Capricorn)  West  3rd,7th,10th Saturday  19Y 3Y1M24D */
var RA    = 8;  /* Rahu    5th, 7th, 9th 18Y */
var KE    = 9;  /* Ketu    5th, 7th, 9th  7Y */

/* Sidereal Zodiac Signs(Fixed) or Rashis   */
var Aries     = 1;       /* Mesha      Fire  M Movable Mars    [00-30]   Apr15 - May15 */
var Taurus    = 2;       /* Vrishaba   Earth F Fixed   Venus   [30-60]   May16 - Jun15 */
var Gemini    = 3;       /* Mithuna    Air   M Common  Mercury [60-90]   Jun16 - Jul15 */
var Cancer    = 4;       /* Karkata    Water F Movable Moon    [90-120]  Jul16 - Aug15 */
var Leo       = 5;       /* Simha      Fire  M Fixed   Sun     [120-150] Aug16 - Sep15 */
var Virgo     = 6;       /* Kanya      Earth F Common  Mercury [150-180] Sep16 - Oct15 */
var Libra     = 7;       /* Tula       Air   M Movable Venus   [180-210] Oct16 - Nov15 */
var Scorpio   = 8;       /* Vrishchika Water F Fixed   Mars    [210-240] Nov16 - Dec15 */
var Sagittarius = 9;     /* Dhanus     Fire  M Common  Jupiter [240-270] Dec16 - Jan14 */
var Capricorn   = 10;    /* Makara     Earth F Movable Saturn  [270-300] Jan15 - Feb14 */
var Aquarius  = 11;      /* Kumbha     Air   M Fixed   Saturn  [300-330] Feb15 - Mar14 */
var Pisces    = 12;      /* Meena      Water F Common  Jupiter [330-360] Mar15 - Apr14 */
var MAXZOD    = 12;      /* Max zodiacs */

/* Houses or Bhavas */
var H1  = 1   /* Lagna     Su    E */
var H2  = 2   /* Dhana     Ju,Ve   */
var H3  = 3   /* Sahaja    Ma      */
var H4  = 4   /* Sukha     Mo    S */
var H5  = 5   /* Putra     Ju      */
var H6  = 6   /* Ari       Me,Ma   */
var H7  = 7   /* Yuvati    Ve    W */
var H8  = 8   /* Randhara  Sa      */
var H9  = 9   /* Dharma    Ju      */
var H10 = 10  /* Karma     Su,Sa,Ma,Me N */
var H11 = 11  /* Labha     Ju      */
var H12 = 12  /* Vyaya     Sa      */
var MAXH= 12  /* Max houses        */

/* Nakshatras (4 Padas x 3°20’)    */
var Ashvini        = 1   /* 0°00'Arie  - 13°20'Arie   Ke */
var Bharani        = 2   /* 13°20'Arie - 26°40'Arie   Ve */
var Krittika       = 3   /* 26°40'Arie - 10°00'Taur   Su */
var Rohini         = 4   /* 10°00'Taur - 23°20'Taur   Mo */
var Mrigashira     = 5   /* 23°20'Taur - 6°40'Gemi    Ma */
var Ardra          = 6   /* 6°40'Gemi  - 20°00'Gemi   Ra */
var Punarvasu      = 7   /* 20°00'Gemi - 3°20'Canc    Ju */
var Pushya         = 8   /* 3°20'Canc  - 16°40'Canc   Sa */
var Ashlesha       = 9   /* 16°40'Canc - 0°00'Leo     Me */
var Magha          = 10  /* 0°00'Leo   - 13°20'Leo    Ke */
var PurvaPhalguni  = 11  /* 13°20'Leo  - 26°40'Leo    Ve */
var UttaraPhalguni = 12  /* 26°40'Leo  - 10°00'Virg   Su */
var Hasta          = 13  /* 10°00'Virg - 23°20'Virg   Mo */
var Chitra         = 14  /* 23°20'Virg - 6°40'Libr    Ma */
var Svati          = 15  /* 6°40'Libr  - 20°00'Libr   Ra */
var Vishakha       = 16  /* 20°00'Libr - 3°20'Scor    Ju */
var Anuradha       = 17  /* 3°20'Scor  - 16°40'Scor   Sa */
var Jyeshtha       = 18  /* 16°40'Scor - 0°00'Sagi    Me */
var Mula           = 19  /* 0°00'Sagi  - 13°20'Sagi   Ke */
var PurvaShadha    = 20  /* 13°20'Sagi - 26°40'Sagi   Ve */
var UttaraShadha   = 21  /* 26°40'Sagi - 10°00'Capr   Su */
var Sravana        = 22  /* 10°00'Capr - 23°20'Capr   Mo */
var Dhanista       = 23  /* 23°20'Capr - 6°40'Aqua    Ma */ 
var Shatabhisha    = 24  /* 6°40'Aqua  - 20°00'Aqua   Ra */
var PurvaBhadra    = 25  /* 20°00'Aqua - 3°20'Pisc    Ju */
var UttaraBhadra   = 26  /* 3°20'Pisc  - 16°40'Pisc   Sa */
var Revati         = 27  /* 16°40'Pisc - 30°00'Pisc   Me */
var MAXNAKSHA      = 27  /* Max  */

function map ()
{
    /*   http://www.openstreetmap.org/?lat=00.00&lon=00.00&zoom=13
     *   http://nominatim.openstreetmap.org/search.php?q=london&polygon=1 
     *   http://nominatim.openstreetmap.org/search.php?q=+[lat,lon]
     *   http://www.geonames.org/search.html?q=antarctica&country=
     */
    var pattern = '^[0-9]';
    if (String(document.getElementById('lat').value).search (pattern) == -1)
        window.open("http://www.geonames.org/search.html?q="+document.getElementById('lat').value); 
    else 
    {   
        var l1 = "http://www.openstreetmap.org/?";
        var tmp = document.getElementById('lat').value.replace(/\s+/g,"").toUpperCase();
        if (tmp.indexOf("N") !=-1) {
            lattmp=tmp.split("N");
            var l2 = dms2real(parseInt(lattmp[0]), parseInt(lattmp[1]), parseInt(0));
        }
        else if (tmp.indexOf("S") !=-1) {
            lattmp=tmp.split("S");
            var l2 = dms2real(parseInt(lattmp[0]), parseInt(lattmp[1]), parseInt(0));
        }  
        var tmp = document.getElementById('lon').value.replace(/\s+/g,"").toUpperCase();
        if (tmp.indexOf("W") !=-1) {
            lontmp=tmp.split("W");
            var l3 = -dms2real(parseInt(lontmp[0]), parseInt(lontmp[1]), parseInt(0));
        }
        else if (tmp.indexOf("E") !=-1) {
            lontmp=tmp.split("E");
            var l3 = dms2real(parseInt(lontmp[0]), parseInt(lontmp[1]), parseInt(0));
        }   
        var l4 = "&zoom=13";
        var link = l1+"lat="+l2+"&lon="+l3+l4;
        
        /*var mapid  = document.getElementById("m");
        var link = document.createElement('a');
        link.setAttribute('href', l1+"lat="+l2+"&lon="+l3+l4);
        link.innerHTML = " (show) ";
        mapid.appendChild(link);*/
       
        window.open(link);
    }
}

function generate () 
{
    parse_input_data();
    calc_position(false);
    draw(false);
}

function parse_input_data ()
{
    name = (document.getElementById('name').value);
    parse_date(document.getElementById('date').value);
    parse_time(document.getElementById('time').value);
    tz  = (document.getElementById('tz').value);
    parse_latitude(document.getElementById('lat').value.toUpperCase()); 
    parse_longitude(document.getElementById('lon').value.toUpperCase());
}

function parse_date (input) 
{
    /* Date format: 1901-01-31 | 1901/01/31*/
   
    date  = 0;
    date  = new Date(input);
}

function parse_time (input)
{
    /* Time format: 23:59 | 7:59 | 07:59  */
   
    time = 0;
    time = new Date();
    
    var tmp = input.replace(/\s+/g,'');
    tmp     = tmp.match(/(\d{1,2})(:(\d\d))/);
        
    if (tmp[1] < 10) tmp[1] = parseInt(tmp[1], 10);//.replace(/^0+/, '');
    if (tmp[3] < 10) tmp[3] = parseInt(tmp[3], 10);//.replace(/^0+/, '');
   
    time.setHours(parseInt(tmp[1]) + ((parseInt(tmp[1]) < 12 && tmp[4] ) ? 12 : 0));
    time.setMinutes(parseInt(tmp[3]) || 0);
    time.setSeconds(parseInt(0)); 
    
    if (parseInt(tmp[1]) >= 24 || parseInt(tmp[3]) > 59 ||
          (parseInt(tmp[1]) == 00 && parseInt(tmp[3]) == 00)) {
           time.setHours(parseInt(0));
           time.setMinutes(parseInt(1));
           document.getElementById('time').value = '00:01';
    }
}

function parse_latitude (input) 
{
    /*  North or South, range between 0 and 90 degrees 
     *  Format: 45N48
     */

    var tmp = input.replace(/\s+/g,"");
    if (tmp.indexOf("N") !=-1) {
        lattmp=tmp.split("N");
        lat = dms2real(parseInt(lattmp[0]), parseInt(lattmp[1]), parseInt(0));
    }
    else if (tmp.indexOf("S") !=-1) {
        lattmp=tmp.split("S");
        lat = dms2real(parseInt(lattmp[0]), parseInt(lattmp[1]), parseInt(0));
        lat = -lat;
    }
}

function parse_longitude (input) 
{
    /*  East or West, range between 0 and 180 degrees 
     *  Format: 15E58
     */

    var tmp = input.replace(/\s+/g,"");
    if (tmp.indexOf("W") !=-1) {
        lontmp=tmp.split("W");
        lon = dms2real(parseInt(lontmp[0]), parseInt(lontmp[1]), parseInt(0));
        lon = -lon;
    }
    else if (tmp.indexOf("E") !=-1) {
        lontmp=tmp.split("E");
        lon = dms2real(parseInt(lontmp[0]), parseInt(lontmp[1]), parseInt(0));
    }
}

function myplanets ( name,index,ra,ruler,r_index,aspect,day,
                     happy_zodiac,happy_house,sad_zodiac,sad_house,
                     good_friend, bad_friend,transitdeg) 
{
    this.name    = name;
    this.index   = index;
    this.ra      = ra;
    this.ruler   = ruler;
    this.r_index = r_index;
    this.aspect  = aspect;
    this.day     = day;
    this.happy_zodiac = happy_zodiac;
    this.happy_house  = happy_house;
    this.sad_zodiac   = sad_zodiac;
    this.sad_house    = sad_house;
    this.good_friend  = good_friend;
    this.bad_friend   = bad_friend;
    this.transitdeg   = transitdeg;
    this.house     = "";
    this.zodiac    = "";
    this.degree    = "";
    this.dosha     = "";
    this.naksha    = "";
    this.retro     = "";
    this.range     = "";
    this.rasizn    = ""; /* Rasi zodiac index         */
    this.horadeg   = ""; /* Hora degree               */
    this.horazn    = ""; /* Hora zodiac index         */
    this.drekkdeg  = ""; /* Drekkana degree           */
    this.drekkzn   = ""; /* Drekkana zodiac index     */
    this.turydeg   = ""; /* Turyamsa degree           */
    this.turyzn    = ""; /* Turyamsa zodiac index     */
    this.pancdeg   = ""; /* Panchamsa degree          */
    this.panczn    = ""; /* Panchamsa zodiac index    */
    this.shashdeg  = ""; /* Shashthamsa degree        */
    this.shashzn   = ""; /* Shashthamsa zodiac index  */
    this.shaptdeg  = ""; /* Shapthamsa degree         */
    this.shaptzn   = ""; /* Shapthamsa zodiac index   */
    this.ashtdeg   = ""; /* Ashthamsa degree          */
    this.ashtzn    = ""; /* Ashthamsa zodiac index    */
    this.navdeg    = ""; /* Navamsa degree            */
    this.navzn     = ""; /* Navamsa zodiac index      */
    this.dashdeg   = ""; /* Dashamsa degree           */
    this.dashzn    = ""; /* Dashamsa zodiac index     */
    this.ekaddeg   = ""; /* Ekadashamsa degree        */
    this.ekadzn    = ""; /* Ekadashamsa zodiac index  */
    this.dwaddeg   = ""; /* Dwadashamsa degree        */
    this.dwadzn    = ""; /* Dwadashamsa zodiac index  */
    this.getra     = function()  { return this.ra;     }
    this.getzodiac = function()  { return this.zodiac; }
    this.getdegree = function()  { return this.degree; }
    this.compute   = function(transit)  
    {
        if (!transit) this.ra = mod360(this.ra);
        else          this.ra = mod360(this.transitdeg);
        // D2 - parasara traditional, 4 and 5
        this.horadeg   = ((this.ra-15.0)-60.0*Math.floor((this.ra-15.0)*(1.0/60.0))+90);
        this.horazn    = calc_zodiac(this.horadeg);
        // D6 - continuos
        this.shashdeg  = mod2pi(this.ra*6.0*RADS)*DEGS;
        this.shashzn   = calc_zodiac(this.shashdeg);
        // D8 - continuos
        this.ashtdeg   = mod2pi(this.ra*8.0*RADS)*DEGS;  
        this.ashtzn    = calc_zodiac(this.ashtdeg);
        // D9 - continuos
        this.navdeg    = mod2pi(this.ra*9.0*RADS)*DEGS;  
        this.navzn     = calc_zodiac(this.navdeg);
        // D12 - parasara traditional
        var l1 = ((this.ra)-30.0*Math.floor((this.ra)*(1.0/30.0)))*12;
        var l2 = parseInt((this.ra/30))*30;
        this.dwaddeg   = mod2pi((l2+l1)*RADS)*DEGS; 
        this.dwadzn    = calc_zodiac(this.dwaddeg);
        
        if (this.ra>=0 && this.ra<=30)        {
            this.zodiac="Aries";
            this.rasizn=1; this.range="000-030";
            this.degree=(this.ra-0);
        }
        else if (this.ra>30  && this.ra<=60)  {
            this.zodiac="Taurus";
            this.rasizn=2; this.range="030-060";
            this.degree=(this.ra-30);
        }
        else if (this.ra>60  && this.ra<=90)  {
            this.zodiac="Gemini";
            this.rasizn=3; this.range="060-090";
            this.degree=(this.ra-60);
        }
        else if (this.ra>90  && this.ra<=120) {
            this.zodiac="Cancer";
            this.rasizn=4; this.range="090-120";
            this.degree=(this.ra-90);
        }
        else if (this.ra>120 && this.ra<=150) {
            this.zodiac="Leo";
            this.rasizn=5; this.range="120-150";
            this.degree=(this.ra-120);
        }
        else if (this.ra>150 && this.ra<=180) {
            this.zodiac="Virgo";
            this.rasizn=6; this.range="150-180";
            this.degree=(this.ra-150);
        }
        else if (this.ra>180 && this.ra<=210) {
            this.zodiac="Libra";
            this.rasizn=7; this.range="180-210";
            this.degree=(this.ra-180);
        }
        else if (this.ra>210 && this.ra<=240) {
            this.zodiac="Scorpio";
            this.rasizn=8; this.range="210-240";
            this.degree=(this.ra-210);
        }
        else if (this.ra>240 && this.ra<=270) {
            this.zodiac="Sagittarius";
            this.rasizn=9; this.range="240-270";
            this.degree=(this.ra-240);
        }
        else if (this.ra>270 && this.ra<=300) {
            this.zodiac="Capricorn";
            this.rasizn=10; this.range="270-300";
            this.degree=(this.ra-270);
        }
        else if (this.ra>300 && this.ra<=330) {
            this.zodiac="Aquarius";
            this.rasizn=11; this.range="300-330";
            this.degree=(this.ra-300);
        }
        else if (this.ra>330 && this.ra<=360) {
            this.zodiac="Pisces";
            this.rasizn=12; this.range="330-360";
            this.degree=(this.ra-330);
        }  
        
        this.compute_division_zodiac();
        this.compute_division_nakshatra();
        this.compute_division_houses();
    }
    this.compute_division_zodiac = function()
    {
        // D1
        var ay = calc_ayanamsa(false);
        var as = calc_ascendant(time.getHours(),time.getMinutes(),false)-ay;
        var x=1;
        for (var i=0; i<MAXZOD; i++)  {
            if (calc_zodiac(as)+i>12) { myrashis[i]=x; x++;            }
            else                      { myrashis[i]=calc_zodiac(as)+i; }   
        }
        // D2
        var x=1;
        var deg = ((as-15.0)-60.0*Math.floor((as-15.0)*(1.0/60.0))+90);
        for (var i=0; i<MAXZOD; i++)   {
            if (calc_zodiac(deg)+i>12) { myhoraz[i]=x; x++;             }
            else                       { myhoraz[i]=calc_zodiac(deg)+i; }   
        }
        // D6
        var x=1;
        var deg = mod2pi(as*6.0*RADS)*DEGS;
        for (var i=0; i<MAXZOD; i++)   {
            if (calc_zodiac(deg)+i>12) { mysashthamshaz[i]=x; x++;             }
            else                       { mysashthamshaz[i]=calc_zodiac(deg)+i; }   
        }
        // D8
        var x=1;
        var deg = mod2pi(as*8.0*RADS)*DEGS;
        for (var i=0; i<MAXZOD; i++)   {
            if (calc_zodiac(deg)+i>12) { myashthamsaz[i]=x; x++;             }
            else                       { myashthamsaz[i]=calc_zodiac(deg)+i; }   
        }
        // D9
        var x=1,deg=0;
        deg = mod2pi(as*9.0*RADS)*DEGS;  
        for (var i=0; i<MAXZOD; i++)   {
            if (calc_zodiac(calc_ayanamsa(deg))+i>12) { mynavamsaz[i]=x; x++;              }
            else                       { mynavamsaz[i]=calc_zodiac(calc_ayanamsa(deg))+i;  }
        }
        // D12
        var x=1,deg=0;
        var l1 = ((as)-30.0*Math.floor((as)*(1.0/30.0)))*12;
        var l2 = parseInt((as/30))*30;
        deg    = mod2pi((l2+l1)*RADS)*DEGS;  
        for (var i=0; i<MAXZOD; i++)   {
            if (calc_zodiac(deg)+i>12) { mydwadashamsaz[i]=x; x++;              }
            else                       { mydwadashamsaz[i]=calc_zodiac(deg)+i;  }
        }
    }
    this.compute_division_nakshatra = function()
    {
        // 1-Nakshatras, 2-N.lord, 3-N.pada,
        for (var i=0; i<=9; i++) {
            mynaksha [i] = calc_nakshatra(mygrahas[i].getra(),1);
            mynakshal[i] = calc_nakshatra(mygrahas[i].getra(),2);
            mynakshap[i] = calc_nakshatra(mygrahas[i].getra(),3);
        }
    }
    this.compute_division_houses = function()
    {
        // D1
        for (var i=0; i<=9; i++) {
            planets[i] = (mygrahas[i].rasizn);
        }
        calc_houses(myrashis,mybhavas,mygrahas);
        // D2
        for (var i=0; i<=9; i++) {
            planets[i] = (mygrahas[i].horazn);
        }
        calc_houses(myhoraz,myhorah,mygrahas);
        // D6
        for (var i=0; i<=9; i++) {
            planets[i] = (mygrahas[i].shashzn);
        }
        calc_houses(mysashthamshaz,mysashthamshah,mygrahas);
        // D8
        for (var i=0; i<=9; i++) {
            planets[i] = (mygrahas[i].ashtzn);
        }
        calc_houses(myashthamsaz,myashthamsah,mygrahas);
        // D9 
        for (var i=0; i<=9; i++) {
            planets[i] = (mygrahas[i].navzn); //.div name
        }
        calc_houses(mynavamsaz,mynavamsah,mygrahas);
        // D12
        for (var i=0; i<=9; i++) {
            planets[i] = (mygrahas[i].dwadzn);
        }
        calc_houses(mydwadashamsaz,mydwadashamsah,mygrahas);
    }
};

function calc_zodiac (_deg)
{
    var zodiac;
    var deg = mod360(_deg);
    
    if (deg>=0 && deg<=30)        {zodiac=Aries;      }
    else if (deg>30  && deg<=60)  {zodiac=Taurus;     }
    else if (deg>60  && deg<=90)  {zodiac=Gemini;     }
    else if (deg>90  && deg<=120) {zodiac=Cancer;     }
    else if (deg>120 && deg<=150) {zodiac=Leo;        }
    else if (deg>150 && deg<=180) {zodiac=Virgo;      }
    else if (deg>180 && deg<=210) {zodiac=Libra;      }
    else if (deg>210 && deg<=240) {zodiac=Scorpio;    }
    else if (deg>240 && deg<=270) {zodiac=Sagittarius;}
    else if (deg>270 && deg<=300) {zodiac=Capricorn;  }
    else if (deg>300 && deg<=330) {zodiac=Aquarius;   }
    else if (deg>330 && deg<=360) {zodiac=Pisces;     }
    
    return zodiac;
}

function calc_houses (zodiac,house,planetname)
{
    house[1]=""; house[2]=""; house[3]=""; house[4]="";
    house[5]=""; house[6]=""; house[7]=""; house[8]="";
    house[9]=""; house[10]="";house[11]="";house[12]="";
    
    var i,j;
    for (i=0; i<=11; i++)  {
        for (j=0; j<=9; j++) {
            if (j>9) j=0;
            if (zodiac[i] == planets[j] && (i==0))
                house[1] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==1)
                house[2] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==2)
                house[3] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==3)
                house[4] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==4)
                house[5] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==5)
                house[6] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==6)
                house[7] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==7)
                house[8] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==8)
                house[9] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==9)
                house[10] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==10)
                house[11] +=  planetname[j].name+" ";
            else if (zodiac[i] == planets[j] && i==11)
                house[12] +=  planetname[j].name+" ";
        }
    }
}

function calc_nakshatra (deg,n)
{
    var nakshatra, lord, pada=0, sdeg=0;
    if      (deg < 0)     {  deg += 360; }  
    if      (deg>=0.0000  && deg<=13.3333)  {nakshatra="Ashvini";  lord="Ke";pada=(deg -   0.0000);sdeg=  0.0000;}
    else if (deg>13.3333  && deg<=26.6667)  {nakshatra="Bharani";  lord="Ve";pada=(deg -  13.3333);sdeg= 13.3333;}
    else if (deg>26.6667  && deg<=40.0000)  {nakshatra="Krittika"; lord="Su";pada=(deg -  26.6667);sdeg= 26.6667;}
    else if (deg>40.0000  && deg<=53.3333)  {nakshatra="Rohini";   lord="Mo";pada=(deg -  40.0000);sdeg= 40.0000;}
    else if (deg>53.3333  && deg<=66.6667)  {nakshatra="Mrigashir";lord="Ma";pada=(deg -  53.3333);sdeg= 53.3333;}
    else if (deg>66.6667  && deg<=80.0000)  {nakshatra="Ardra";    lord="Ra";pada=(deg -  66.6667);sdeg= 66.6667;}
    else if (deg>80.0000  && deg<=93.3333)  {nakshatra="Punarvasu";lord="Ju";pada=(deg -  80.0000);sdeg= 80.0000;}
    else if (deg>93.3333  && deg<=106.6667) {nakshatra="Pushya";   lord="Sa";pada=(deg -  93.3333);sdeg= 93.3333;}
    else if (deg>106.6667 && deg<=120.0000) {nakshatra="Ashlesha"; lord="Me";pada=(deg - 106.6667);sdeg=106.6667;}
    else if (deg>120.0000 && deg<=133.3333) {nakshatra="Magha";    lord="Ke";pada=(deg - 120.0000);sdeg=120.0000;}
    else if (deg>133.3333 && deg<=146.6667) {nakshatra="P.Phalg";  lord="Ve";pada=(deg - 133.3333);sdeg=133.3333;}
    else if (deg>146.6667 && deg<=160.0000) {nakshatra="U.Phalg";  lord="Su";pada=(deg - 146.6667);sdeg=146.6667;}
    else if (deg>160.0000 && deg<=173.3333) {nakshatra="Hasta";    lord="Mo";pada=(deg - 160.0000);sdeg=160.0000;}
    else if (deg>173.3333 && deg<=186.6667) {nakshatra="Chitra";   lord="Ma";pada=(deg - 173.3333);sdeg=173.3333;}
    else if (deg>186.6667 && deg<=200.0000) {nakshatra="Svati";    lord="Ra";pada=(deg - 186.6667);sdeg=186.6667;}
    else if (deg>200.0000 && deg<=213.3333) {nakshatra="Vishakha"; lord="Ju";pada=(deg - 200.0000);sdeg=200.0000;}
    else if (deg>213.3333 && deg<=226.6667) {nakshatra="Anuradha"; lord="Sa";pada=(deg - 213.3333);sdeg=213.3333;}
    else if (deg>226.6667 && deg<=240.0000) {nakshatra="Jyeshtha"; lord="Me";pada=(deg - 226.6667);sdeg=226.6667;}
    else if (deg>240.0000 && deg<=253.3333) {nakshatra="Mula";     lord="Ke";pada=(deg - 240.0000);sdeg=240.0000;}
    else if (deg>253.3333 && deg<=266.6667) {nakshatra="P.Shadha"; lord="Ve";pada=(deg - 253.3333);sdeg=253.3333;}
    else if (deg>266.6667 && deg<=280.0000) {nakshatra="U.Shadha"; lord="Su";pada=(deg - 266.6667);sdeg=266.6667;}
    else if (deg>280.0000 && deg<=293.3333) {nakshatra="Sravana";  lord="Mo";pada=(deg - 280.0000);sdeg=280.0000;}
    else if (deg>293.3333 && deg<=306.6667) {nakshatra="Dhanista"; lord="Ma";pada=(deg - 293.3333);sdeg=293.3333;}
    else if (deg>306.6667 && deg<=320.0000) {nakshatra="Shatabhi"; lord="Ra";pada=(deg - 306.6667);sdeg=306.6667;}
    else if (deg>320.0000 && deg<=333.3333) {nakshatra="P.Bhadra"; lord="Ju";pada=(deg - 320.0000);sdeg=320.0000;}
    else if (deg>333.3333 && deg<=346.6667) {nakshatra="U.Bhadra"; lord="Sa";pada=(deg - 333.3333);sdeg=333.3333;}
    else if (deg>346.6667 && deg<=360.0000) {nakshatra="Revati";   lord="Me";pada=(deg - 346.6667);sdeg=346.6667;}
    
    if      (n == 1)  return nakshatra;
    else if (n == 2)  return lord;
    else if (n == 3)  {
         if (pada >= 0.000000 && pada <=3.333334)
            return 1;
         if (pada > 3.333334  && pada <=6.666667)
            return 2;
         if (pada > 6.666667  && pada <=9.999999)
            return 3;
         if (pada > 9.999999  && pada <=13.400000)
            return 4;
    }
    else if (n == 4)  {
            return sdeg;
    }
}

function calc_planets_position () 
{
    var today = new Date();
    dn = calc_day_number(time.getHours(),time.getMinutes(),false);
    
    var jd    = calc_julian_date(time.getHours(),time.getMinutes(),tz,false);
    var jdnow = calc_julian_date(today.getHours(),today.getMinutes(),tz,true);
    
    var ay    = calc_ayanamsa(false);
    var aynow = calc_ayanamsa(true);
    
    var as    = calc_ascendant(time.getHours(),time.getMinutes(),false)-ay;
    var asnow = calc_ascendant(today.getHours(),today.getMinutes(),true)-aynow;
    
    mygrahas[0] = new myplanets("As",AS,as,"","","","","","","","","","",asnow);
    
    mygrahas[1] = new myplanets("Su",SU,calc_vsop87(1,jd)-ay,"Leo",Leo,"7th","Sunday",
                      "Le,Ar","1,5,9,10","Li","4,6,7,8,12","Mo,Ma,Ju","Sa,Ve",
                      calc_vsop87(1,jdnow)-aynow);//calc_ra(0) //0
    
    mygrahas[2] = new myplanets("Mo",MO,calc_moon_positionIII(false)-ay,"Cancer",Cancer,"7th",
                      "Monday","Ca,Ta","4,7,9,11,12","Sc,Cp","2,3,6,8","Su,Me"," - ",
                      calc_moon_positionIII(true)-aynow);
    
    mygrahas[3] = new myplanets("Ma",MA,calc_vsop87(3,jd)-ay,"Aries",Aries,"4,7,8th",
                      "Tuesday","Ar,Sc,Cp","1,3,5,8,10,11","Ca,Li,Pi","2,4,6,12","Su,Mo,Ju","Me",
                      calc_vsop87(3,jdnow)-aynow);  //1
    
    mygrahas[4] = new myplanets("Me",ME,calc_vsop87(4,jd)-ay,"Virgo",Virgo,"7th",
                      "Wednesday","Vi,Ge","1,3,5,6,7,10,11","Sa,Pi","2,4,8,9,12","Ve,Su","Mo",
                      calc_vsop87(4,jdnow)-aynow);  //2
    
    mygrahas[5] = new myplanets("Ju",JU,calc_vsop87(5,jd)-ay,"Sagittarius",Sagittarius,"5,7,9th",
                      "Thursday","Ca","1,4,5,7,9,10,2,11","Cp","2,11","Su,Mo,Ma","Ve,Me",
                      calc_vsop87(5,jdnow)-aynow);  //3
    
    mygrahas[6] = new myplanets("Ve",VE,calc_vsop87(6,jd)-ay,"Libra",Libra,"7th",
                      "Friday","Li,Ta,Pi","1,2,4,5,7.9.11,12","Sc,Vi","3,6,8,10","Sa,Me","Su,Mo",
                      calc_vsop87(6,jdnow)-aynow);  //4
    
    mygrahas[7] = new myplanets("Sa",SA,calc_vsop87(7,jd)-ay,"Aquarius",Aquarius,"3,7,10th",
                      "Saturday","Li,Cp,Aq","3,6,7,10,11","Ar,Ca","4,5,8,9,12","Me,Ve","Su,Mo,Ma",
                      calc_vsop87(7,jdnow)-aynow);  //5
    
    mygrahas[8] = new myplanets("Ra",RA,calc_moon_acending_node(false),"","","5,7,9th","",
                      "Ta,Ge,Vi,Li","1,2,3,5,10,11","Sg,Ar,Le,Pi","4,6,7,8,9,12"," - "," - ",
                      calc_moon_acending_node(true));
    
    mygrahas[9] = new myplanets("Ke",KE,mod360(calc_moon_acending_node(false)+180),"","","5,7,9th","",
                      "Sc,Pi,Sg,Ar","4,6,8,9,12","Ta,Ge,Vi,Li","1,2,3,5,7,10,11"," - "," - ",
                      calc_moon_acending_node(true)+180);
}

function calc_position (transit)
{   
    calc_planets_position();
    for (var i=0; i<=9; i++) {  mygrahas[i].compute(transit); }
}
    
function elements ()
{   
   /*    http://ssd.jpl.nasa.gov
    *    http://spaceflight.nasa.gov/realdata/elements
    *    http://solarsystem.nasa.gov
    */

    a = parseFloat("0");        /*   semi-major axis [AU]       */
    e = parseFloat("0");        /*   eccentricity of orbit      */
    i = parseFloat("0");        /*   inclination of orbit [deg] */
    O = parseFloat("0");        /*   longitude of the ascending node [deg] */
    w = parseFloat("0");        /*   longitude of perihelion [deg]         */
    L = parseFloat("0");        /*   mean longitude [deg]                  */
}

function calc_day_number (hours,minutes,transit)
{   
    /*  day number to/from J2000 */
   
    var today = new Date(),yy,mm,dd;
    if (!transit) {
        yy = date.getFullYear();
        mm = date.getMonth()+1;
        dd = date.getDate();
    }
    else {
        yy = today.getFullYear();
        mm = today.getMonth()+1;
        dd = today.getDate();
    }   
    if (mm < 3) { yy -= 1; mm += 12; }
    
    if (yy*10000+mm*100+dd > 15821004) { // 15821015
        var a = Math.floor(0.01 * yy);
        var b = 2 - a + Math.floor(0.25 * a);
    }
    else {
        var a = Math.floor(0.01 * yy);
        var b = 0*(2 - a + Math.floor(0.25 * a));
    }
    
    var c  = Math.floor(365.25*yy);
    var d  = Math.floor(30.6001*(mm+1));

    return (b + c + d - 730550.5 + dd + (((hours-tz)) + minutes/60.0)/24.0);
}

function calc_julian_date (hours,minutes,_tz,transit) 
{   
    /*    Days since the beginning of the Julian period 
     *    plus dT and the fraction of the day
     */

    var today = new Date(),yy,mm,dd;
    if (!transit) { 
        yy=date.getFullYear();
        mm=date.getMonth()+1;
        dd=date.getDate();
    }
    else {
        yy=today.getFullYear();
        mm=today.getMonth()+1;
        dd=today.getDate();
    }
    var jy = yy;
    var jm = mm;
    var df;
    if (mm > 2) { jy = yy; jm++;     } 
    else        { jy--;    jm += 13; }
    
    var j = Math.floor(365.25 * jy) + Math.floor(30.6001*jm) + dd + 1720995.0;
    if (dd + 31 * (mm + 12 * yy) >= 588829) {
        var a = Math.floor(0.01 * jy);
        j += 2 - a + Math.floor(0.25 * a);
    }

    df = (hours - _tz) / 24.0 - 0.5; 
    if (df < 0.0) { df += 1.0; --j; }
    var fc = df + (minutes + dT(transit) / 60.0) / 60.0 / 24.0;
    var jd = Math.floor(((j + fc) * 10000000));
    if ((((j + fc) * 10000000) - jd) > 0.5) ++jd;
    else jd *= 1.0;
    return (jd * 0.0000001);
}

function calc_day_of_the_week (transit)
{ 
    var jd  = calc_julian_date(time.getHours(),time.getMinutes(),0,transit);
    var day = (Math.floor(jd + 0.5) + 1) % 7;
    var str;
    
    switch (day) {
        case 0:
            str="Sunday";
            break;
        case 1:
            str="Monday";
            break;
        case 2:
            str="Tuesday";         
            break;
        case 3:
            str="Wednesday";                
            break;
        case 4:
            str="Thursday";         
            break;
        case 5:  
            str="Friday";       
            break;
        case 6:
            str="Saturday";         
            break;
        default:
            str="NaN"; 
    }
    
    return str;
}

function calc_sideral_time (hours,minutes,transit)
{
    /*   local mean sideral time [deg] 
     *   West longitudes are negative
     */

    if (londir == "W")
        lon = -lon;
    
    var t    = (calc_day_number(hours,minutes,transit)/36525.0);
    var tt   = t * 36525.0
    var LMST = mod360(280.46061837 + 360.98564736629 * tt
                + 0.000387933*t*t - (t*t*t)/38710000 + lon);
    return LMST;
}

function calc_ra (p)
{
    /* Calculate planetary positions using the mean orbital elements */
    
    var cy = (dn/36525); 
    
    var planet = new elements();
    mean_elements(planet, p);
    var ap = planet.a;
    var ep = planet.e;
    var ip = planet.i;
    var op = planet.O;
    var pp = planet.w;
    var lp = planet.L;
 
    var earth = new elements();
    mean_elements(earth, 0);
    var ae = earth.a;
    var ee = earth.e;
    var ie = earth.i;
    var oe = earth.O;
    var pe = earth.w;
    var le = earth.L; 
    
    /* position of Earth in its orbit */
    var me = mod2pi(le - pe);
    var ve = true_anomaly(me, ee);
    var re = ae*(1 - ee*ee)/(1 + ee*Math.cos(ve));
    
    /* heliocentric rectangular coordinates of Earth */
    var xe = re*Math.cos(ve + pe);
    var ye = re*Math.sin(ve + pe);
    var ze = 0.0;
    
    /* position of planet in its orbit */
    var mp = mod2pi(lp - pp);
    var vp = true_anomaly(mp, planet.e);
    var rp = ap*(1 - ep*ep)/(1 + ep*Math.cos(vp));
    
    /* heliocentric rectangular coordinates of planet */
    var xh = rp*(Math.cos(op)*Math.cos(vp + pp - op) - Math.sin(op)*Math.sin(vp + pp - op)*Math.cos(ip));
    var yh = rp*(Math.sin(op)*Math.cos(vp + pp - op) + Math.cos(op)*Math.sin(vp + pp - op)*Math.cos(ip));
    var zh = rp*(Math.sin(vp + pp - op)*Math.sin(ip));
    
    /* compute Sun */
    if (p == 0) {
        xh = 0;
        yh = 0;
        zh = 0;
    }
    
    /* convert to geocentric rectangular coordinates */
    var xg = xh - xe;
    var yg = yh - ye;
    var zg = zh - ze;
    
    /* rotate around x axis from ecliptic to equatorial coords
       ecl - obliquity of the ecliptic;
    */
    var ecl = ((23.4392911 - 0.0000003563) * cy) * RADS;             
    var xeq = xg;
    var yeq = yg*Math.cos(ecl) - zg*Math.sin(ecl);
    var zeq = yg*Math.sin(ecl) + zg*Math.cos(ecl);
    
    /*  ra and dec from the rectangular equatorial coords 
     *  http://mysite.verizon.net/res148h4j/index.html
     *  http://stjarnhimlen.se/english.html
     */
    ra = mod2pi(Math.atan2(yeq, xeq))*DEGS;
    
    /*  @Unused 
     *  dec = Math.atan(zeq/Math.sqrt(xeq*xeq + yeq*yeq))*DEGS; */
    /*  r   = Math.sqrt(xeq*xeq + yeq*yeq + zeq*zeq);           */
   
    return ra;
}

function true_anomaly (M, e)
{
    var V, E1;
    
    /*  Kepler's equation - improve accuracy 
     *  http://mathworld.wolfram.com/KeplersEquation.html
     */
    
    var E = M + e*Math.sin(M)*(1.0 + e*Math.cos(M));
    do                                   
    {
        E1 = E;
        E  = E1 - (E1 - e*Math.sin(E1) - M)/(1 - e*Math.cos(E1));
    }
    while (Math.abs( E - E1 ) > EPS);
    
    /* convert eccentric anomaly to true anomaly */
    V = 2*Math.atan(Math.sqrt((1 + e)/(1 - e))*Math.tan(0.5*E));
    if (V < 0) V = V + (2*Math.PI);
    
    return V;
}

function mean_elements (p, i)
{
    var cy = dn/36525;                    
 
    switch (i) {
        case 0: // Sun
            p.a = 1.00000011 - 0.00000005*cy;
            p.e = 0.01671022 - 0.00003804*cy;
            p.i = (  0.00005 -    46.94*cy/3600)*RADS;
            p.O = (-11.26064 - 18228.25*cy/3600)*RADS;
            p.w = (102.94719 +  1198.28*cy/3600)*RADS;
            p.L = mod2pi((100.46435 + 129597740.63*cy/3600)*RADS);
            break;
        case 1: // Mars
            p.a = 1.52366231 - 0.00007221*cy;
            p.e = 0.09341233 + 0.00011902*cy;
            p.i = (  1.85061 -   25.47*cy/3600)*RADS;
            p.O = ( 49.57854 - 1020.19*cy/3600)*RADS;
            p.w = (336.04084 + 1560.78*cy/3600)*RADS;
            p.L = mod2pi((355.45332 + 68905103.78*cy/3600)*RADS);
            break;
        case 2: // Mercury
            p.a = 0.38709893 + 0.00000066*cy;
            p.e = 0.20563069 + 0.00002527*cy;
            p.i = ( 7.00487  -  23.51*cy/3600)*RADS;
            p.O = (48.33167  - 446.30*cy/3600)*RADS;
            p.w = (77.45645  + 573.57*cy/3600)*RADS;
            p.L = mod2pi((252.25084 + 538101628.29*cy/3600)*RADS);
            break;
        case 3: // Jupiter
            p.a = 5.20336301 + 0.00060737*cy;
            p.e = 0.04839266 - 0.00012880*cy;
            p.i = (  1.30530 -    4.15*cy/3600)*RADS;
            p.O = (100.55615 + 1217.17*cy/3600)*RADS;
            p.w = ( 14.75385 +  839.93*cy/3600)*RADS;
            p.L = mod2pi((34.40438 + 10925078.35*cy/3600)*RADS);
            break;
        case 4: // Venus
            p.a = 0.72333199 + 0.00000092*cy;
            p.e = 0.00677323 - 0.00004938*cy;
            p.i = (  3.39471 -   2.86*cy/3600)*RADS;
            p.O = ( 76.68069 - 996.89*cy/3600)*RADS;
            p.w = (131.53298 - 108.80*cy/3600)*RADS;
            p.L = mod2pi((181.97973 + 210664136.06*cy/3600)*RADS);
            break;   
        case 5: // Shani
            p.a = 9.53707032 - 0.00301530*cy;
            p.e = 0.05415060 - 0.00036762*cy;
            p.i = (  2.48446 +    6.11*cy/3600)*RADS;
            p.O = (113.71504 - 1591.05*cy/3600)*RADS;
            p.w = ( 92.43194 - 1948.89*cy/3600)*RADS;
            p.L = mod2pi((49.94432 + 4401052.95*cy/3600)*RADS);
            break;
        default:
            window.alert(" Have you discovered a new planet :) ");
    }
}

function calc_vsop87 (planet,jd)
{
    /*   Calculate planetary positions using the high-precision VSOP87 theory 
     *   constructed by P.Bretagnon and G.Francou [1988] at the Bureau des Longitudes, Paris 
     */
    
    var  X=0, Y=1, Z=2;
    var  Xp,  Yp,  Zp,  Rp;
    var  Xe,  Ye,  Ze,  Re;
    var  Xa,  Ya,  Za,  Ra;
    
    // number of Julian millenia elapsed from J2000
    var T = (jd - 2451545.0)/365250.0;
    
    // calculate heliocentric rectangular coordinates of Earth 
    calc_earth(T);
    
    // heliocentric rectangular coordinates of Earth 
    Xe = earth[X];
    Ye = earth[Y];
    Ze = earth[Z];
   
    switch (planet) {
        case 1:
            Xp = -earth[X];
            Yp = -earth[Y];
            Zp = -earth[Z];
            break;
        case 2:
            //calc_moon(T);
            //Xp = moon[X];
            //Yp = moon[Y];
            //Zp = moon[Z];
            break;
        case 3:
            calc_mars(T);
            Xp = mars[X];
            Yp = mars[Y];
            Zp = mars[Z];
            break;
        case 4:
            calc_mercury(T);
            Xp = mercury[X];
            Yp = mercury[Y];
            Zp = mercury[Z];
            break;
        case 5: 
            calc_jupiter(T);
            Xp = jupiter[X];
            Yp = jupiter[Y];
            Zp = jupiter[Z];
            break;  
        case 6: 
            calc_venus(T); 
            Xp = venus[X];
            Yp = venus[Y];
            Zp = venus[Z];
            break;
        case 7: 
            calc_shani(T);
            Xp = shani[X];
            Yp = shani[Y];
            Zp = shani[Z];
            break;
        default:
            window.alert(" error ;) ");
    }
    
    // Sun coordinates
    if (planet == SU) { Xe=0; Ye=0; Ze=0; }
    
    // true geocentric ecliptical coordinates 
    Xa = (Xp - Xe);
    Ya = (Yp - Ye);
    Za = (Zp - Ze);
    
    // spherical geocentric coordinates
    Ra = Math.atan2(Ya,Xa)*DEGS;
    
    return Ra;
}

function calc_moon_positionI () 
{
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var jy = year;
    var jm = month;
    var jh = time.getHours() - tz + time.getMinutes()/60;
    if (month < 3) { jy -= 1; jm += 12 };      
    if (year*10000+month*100+day > 15821004) {
        var a = Math.floor(0.01 * jy);
        var b = 2 - a + Math.floor(0.25 * a);
    }
    else {
        var a = Math.floor(0.01 * jy);
        var b = 0*(2 - a + Math.floor(0.25 * a));
    }
    var JD = Math.floor(365.25 * jy) 
            +Math.floor(30.6001 * (jm + 1))
            -730550.4 + day + (jh) / 24 + b;
          
    /* time of perihelion */
    // var T = ...toFixed(1)/36525.0;
    var T = JD / 36525.0;
    
    /* Sun's mean longitude */
    var Ls = mod360(280.466 + 36000.8 * T);
    
    /* Sun's mean anomaly */
    var Ms = mod360(357.529+35999 * T - 0.0001536 * T*T + T*T*T/24490000);
    
    /* equation of the center */
    var C =   Math.sin(Ms*RADS) * (1.915 - 0.004817 * T - 0.000014 * T*T)
            + (0.01999 - 0.000101 * T) * Math.sin(2*Ms*RADS) 
            +  0.00029 * Math.sin(3*Ms*RADS);
    
    /* Sun's true anomaly */
    var v = Ms + C;
    
    /* orbit eccentricity */
    var e = 0.01671 - 0.00004204 * T - 0.0000001236 * T*T;
    
    /* distance Earth-Sun */
    var rs = 0.99972 / (1 + e * Math.cos(v*RADS));
    
    /* Sun's true longitude */
    var ls = Ls + C;
    
    /* longitude of the ascending node */
    var Ns = mod360(125.04 - 1934.1 * T);
    
    /* Sun's ecliptic longitude */
    var Ls = ls - 0.00569 - 0.00478 * Math.sin(Ns*RADS);
    
    /* obliquity of the ecliptic */
    var ecl = (84381.448 - 46.815 * T)/3600;
    
    var xs = Math.sin(ls*RADS) * Math.cos(ecl*RADS);
    var ys = 0;
    var zs = Math.cos(ls*RADS);
    
    /* Sun's right ascension */
    RAs = mod2pi(Math.atan2(xs-ys,zs))*DEGS;

    /* the mean distance of the Moon from the ascending node */
    var F = mod360(93.2721 + 483202 * T - 0.003403 * T*T - T*T*T/3526000);
    
    /* Moon's mean longitude */
    var Lm = mod360(218.316 + 481268 * T);
    
    /* Moon's mean anomaly */
    var Mm = mod360(134.963 + 477199 * T + 0.008997 * T*T + T*T*T/69700);
    
    /* mean elongation of the Moon */
    var D = mod360(297.85 + 445267 * T - 0.00163 * T*T + T*T*T/545900);
    
    /* distance Earth-Moon */
    var rm = 1 + (-20954 * Math.cos(Mm*RADS) 
               - 3699 * Math.cos((2*D-Mm)*RADS) 
               - 2956 * Math.cos(2*D)*RADS) / 385000;
    
    /* Moon's geocentric latitude */
    var lat  = 5.128  * Math.sin(F*RADS) 
             + 0.2806 * Math.sin((Mm+F)*RADS)
             + 0.2777 * Math.sin((Mm-F)*RADS) 
             + 0.1732 * Math.sin((2*D-F)*RADS);
    
    var term = 6.289  * Math.sin(Mm*RADS) 
             + 1.274  * Math.sin((2*D-Mm)*RADS) 
             + 0.6583 * Math.sin(2*D*RADS)
             + 0.2136 * Math.sin(2*Mm*RADS) 
             - 0.1851 * Math.sin(Ms*RADS) 
             - 0.1143 * Math.sin(2*F*RADS)
             + 0.0588 * Math.sin((2*D - 2*Mm)*RADS) 
             + 0.0572 * Math.sin((2*D - Ms-Mm)*RADS) 
             + 0.0533 * Math.sin((2*D + Mm)*RADS);
    
    /* Moon's geocentric longitude */
    var lon = term + Lm;
    
    var xm = Math.sin(lon*RADS) * Math.cos(ecl*RADS);
    var ym = Math.tan(lat*RADS) * Math.sin(ecl*RADS);
    var zm = Math.cos(lon*RADS);
    
    /* Moon's geocentric right ascension */
    RAm = mod2pi(Math.atan2(xm-ym,zm))*DEGS;
    
    return RAm;
}

function calc_moon_positionII () 
{
    var JD =  calc_julian_date(time.getHours(),time.getMinutes(),tz,false) - 2451543.5; 
 
    /* orbital elements of the Moon */
    var N = mod2pi((125.1228 - 0.0529538083  * JD)*RADS);  
    var i =  5.1454*RADS;                          
    var w = mod2pi((318.0634 + 0.1643573223  * JD)*RADS);  
    var a =  60.2666; /* 0.002569489 AU; 60.2666 radii; */                              
    var e =  0.054900;                           
    var M = mod2pi((115.3654 + 13.0649929509 * JD)*RADS);

    var cy = JD/36525;
    var ecl = 23.4393 - 3.563E-7 * JD;
  
    var E = M + e * Math.sin(M) * ( 1.0 + e * Math.cos(M) );
    var E1;
    do                                   
    {
        E1 = E;
        E  = E1 - (E1 - e*Math.sin(E1) - M)/(1 - e*Math.cos(E1));
    }
    while (Math.abs( E - E1 ) > EPS);
    
    /* rectangular coordinates - lunar orbit */
    var xv = a*( Math.cos(E) - e );
    var yv = a*( Math.sqrt(1 - e*e) * Math.sin(E) );
    
    /* r - distance, v - true anomaly */
    var v = mod2pi(Math.atan2( yv, xv ));
    var r = Math.sqrt( xv*xv + yv*yv );
    
    /* ecliptic coordinates */
    var xh = r * ( Math.cos(N) * Math.cos(v+w) - Math.sin(N) * Math.sin(v+w) * Math.cos(i) );
    var yh = r * ( Math.sin(N) * Math.cos(v+w) + Math.cos(N) * Math.sin(v+w) * Math.cos(i) );
    var zh = r * ( Math.sin(v+w) * Math.sin(i) );
    
    /* equatorial geocentric coordinates */
    var xe = xh;
    var ye = yh * Math.cos(ecl) - zh*Math.sin(ecl);
    var ze = yh * Math.sin(ecl) + zh*Math.cos(ecl);
    
    /* convert to spherical coordinates */
    var lonecl = mod2pi(Math.atan2( yh,xh )); 
    var latecl = (Math.atan2( zh, Math.sqrt(xh*xh + yh*yh) ));
    var recl   = (Math.sqrt( xe*xe + ye*ye + ze*ze ));
    
    /* orbital elements of the Sun */
    var Ns = 0.0;  
    var as = 1.00000011 - 0.00000005*cy;
    var es = 0.016709 - 1.151E-9 * cy;
    var is = (0.00005 -    46.94*cy/3600)*RADS;
    var ws = mod2pi((282.9404 + 4.70935E-5 * JD)*RADS);      
    var Ms = mod2pi((356.0470 + 0.9856002585 * JD)*RADS);    
    var Ls = mod2pi((Ms*DEGS + ws*DEGS)*RADS); 
    
    /*   Ms, Mm             Mean Anomaly of the Sun and the Moon
         Nm                 Longitude of the Moon's node
         ws, wm             Argument of perihelion for the Sun and the Moon
         Ls = Ms + ws       Mean Longitude of the Sun
         Lm = Mm + wm + Nm  Mean longitude of the Moon
         D = Lm - Ls        Mean elongation of the Moon
         F = Lm - Nm        Argument of latitude for the Moon
    */

    var Mm = M*DEGS;
    var Lm = mod2pi(N + w + M)*DEGS;
    var D  = Lm-Ls*DEGS;
    var F  = Lm-N*DEGS;
    
    var tlon,tlat,tr;
    
    /* perturbations */ 
    tlon =  -1.274 * Math.sin(Mm*RADS - 2*D*RADS)
            +0.658 * Math.sin(2*D*RADS)         
            -0.186 * Math.sin(Ms)          
            -0.059 * Math.sin(2*Mm*RADS - 2*D*RADS)
            -0.057 * Math.sin(Mm*RADS - 2*D*RADS + Ms)
            +0.053 * Math.sin(Mm*RADS + 2*D*RADS)
            +0.046 * Math.sin(2*D*RADS - Ms)
            +0.041 * Math.sin(Mm*RADS - Ms)
            -0.035 * Math.sin(D*RADS)            
            -0.031 * Math.sin(Mm*RADS + Ms)
            -0.015 * Math.sin(2*F*RADS - 2*D*RADS)
            +0.011 * Math.sin(Mm*RADS  - 4*D*RADS);
    tlat =  -0.173 * Math.sin(F*RADS - 2*D*RADS)
            -0.055 * Math.sin(Mm*RADS - F*RADS - 2*D*RADS)
            -0.046 * Math.sin(Mm*RADS + F*RADS - 2*D*RADS)
            +0.033 * Math.sin(F*RADS + 2*D*RADS)
            +0.017 * Math.sin(2*Mm*RADS + F*RADS);
    tr   =  -0.58  * Math.cos(Mm*RADS - 2*D*RADS)
            -0.46  * Math.cos(2*D*RADS);
    
    lonecl = (lonecl*DEGS + tlon);
    latecl = (latecl*DEGS + tlat);
    r      = (r + tr);
    
    var xg = r * Math.cos(lonecl*RADS) * Math.cos(latecl*RADS);
    var yg = r * Math.sin(lonecl*RADS) * Math.cos(latecl*RADS);
    var zg = r * Math.sin(latecl*RADS);
    
    /* rotate to equatorial coords */ 
    xe = xg;
    ye = yg * Math.cos(ecl*RADS) - 0 * Math.sin(ecl);
    ze = yg * Math.sin(ecl*RADS) + 0 * Math.cos(ecl);
    
    /* geocentric ra and dec */
    var ra   = mod2pi(Math.atan2(ye, xe))*DEGS;
   
    /* @Unused 
     * var dec = Math.atan(ze/Math.sqrt(xe*xe + ye*ye))*DEGS;  */
    /* var r   = Math.sqrt(xe*xe + ye*ye);                     */
    
    return ra;
}

function calc_moon_positionIII (transit) 
{
    /*   Jean Meeus "Astronomical Algorithms" 
     *   High precision calculation of the Moon's geocentric longitude 
     */
    
    var lrCoeff = [60]; for (var i=0; i<60; i++) { lrCoeff[i] = [4] }
    lrCoeff = [
    [0, 0, 1, 0],[2, 0,-1, 0],[2, 0, 0, 0],[0, 0, 2, 0],[0, 1, 0, 0],[0, 0, 0, 2],[2, 0,-2, 0],
    [2,-1,-1, 0],[2, 0, 1, 0],[2,-1, 0, 0],[0, 1,-1, 0],[1, 0, 0, 0],[0, 1, 1, 0],[2, 0, 0,-2],
    [0, 0, 1, 2],[0, 0, 1,-2],[4, 0,-1, 0],[0, 0, 3, 0],[4, 0,-2, 0],[2, 1,-1, 0],[2, 1, 0, 0],
    [1, 0,-1, 0],[1, 1, 0, 0],[2,-1, 1, 0],[2, 0, 2, 0],[4, 0, 0, 0],[2, 0,-3, 0],[0, 1,-2, 0],
    [2, 0,-1, 2],[2,-1,-2, 0],[1, 0, 1, 0],[2,-2, 0, 0],[0, 1, 2, 0],[0, 2, 0, 0],[2,-2,-1, 0],
    [2, 0, 1,-2],[2, 0, 0, 2],[4,-1,-1, 0],[0, 0, 2, 2],[3, 0,-1, 0],[2, 1, 1, 0],[4,-1,-2, 0],
    [0, 2,-1, 0],[2, 2,-1, 0],[2, 1,-2, 0],[2,-1, 0,-2],[4, 0, 1, 0],[0, 0, 4, 0],[4,-1, 0, 0],
    [1, 0,-2, 0],[2, 1, 0,-2],[0, 0, 2,-2],[1, 1, 1, 0],[3, 0,-2, 0],[4, 0,-3, 0],[2,-1, 2, 0],
    [0, 2, 1, 0],[1, 1,-1, 0],[2, 0, 3, 0],[2, 0,-1,-2]];
  
    var bCoeff = [60]; for (var i=0; i<60; i++) { bCoeff[i] = [4] }
    bCoeff = [
    [0, 0, 0, 1],[ 0, 0, 1, 1],[ 0, 0, 1,-1],[ 2, 0, 0,-1],[ 2, 0,-1, 1],[ 2, 0,-1,-1],[ 2, 0, 0, 1],
    [0, 0, 2, 1],[ 2, 0, 1,-1],[ 0, 0, 2,-1],[ 2,-1, 0,-1],[ 2, 0,-2,-1],[ 2, 0, 1, 1],[ 2, 1, 0,-1],
    [2,-1,-1, 1],[ 2,-1, 0, 1],[ 2,-1,-1,-1],[ 0, 1,-1,-1],[ 4, 0,-1,-1],[ 0, 1, 0, 1],[ 0, 0, 0, 3],
    [0, 1,-1, 1],[ 1, 0, 0, 1],[ 0, 1, 1, 1],[ 0, 1, 1,-1],[ 0, 1, 0,-1],[ 1, 0, 0,-1],[ 0, 0, 3, 1],
    [4, 0, 0,-1],[ 4, 0,-1, 1],[ 0, 0, 1,-3],[ 4, 0,-2, 1],[ 2, 0, 0,-3],[ 2, 0, 2,-1],[ 2,-1, 1,-1],
    [2, 0,-2, 1],[ 0, 0, 3,-1],[ 2, 0, 2, 1],[ 2, 0,-3,-1],[ 2, 1,-1, 1],[ 2, 1, 0, 1],[ 4, 0, 0, 1],
    [2,-1, 1, 1],[ 2,-2, 0,-1],[ 0, 0, 1, 3],[ 2, 1, 1,-1],[ 1, 1, 0,-1],[ 1, 1, 0, 1],[ 0, 1,-2,-1],
    [2, 1,-1,-1],[ 1, 0, 1, 1],[ 2,-1,-2,-1],[ 0, 1, 2, 1],[ 4, 0,-2,-1],[ 4,-1,-1,-1],[ 1, 0, 1,-1],
    [4, 0, 1,-1],[ 1, 0,-1,-1],[ 4,-1, 0,-1],[ 2,-2, 0, 1]];
    
    var lTerms = [
    6288774,1274027,658314,213618,-185116,-114332,58793,57066,53322,45758,-40923,-34720,
   -30383,15327,-12528,10980,10675,10034,8548,-7888,-6766,-5163,4987,4036,3994,3861,3665,
   -2689,-2602,2390,-2348,2236,-2120,-2069,2048,-1773,-1595,1215,-1110,-892,-810,759,-713,
   -700,691,596,549,537,520,-487,-399,-381,351,-340,330,327,-323,299,294,0];
                         
    var rTerms = [
   -20905355,-3699111,-2955968,-569925,48888,-3149,246158,-152138,-170733,-204586,-129620,
    108743,104755,10321,0,79661,-34782,-23210,-21636,24208,30824,-8379,-16675,-12831,-10445,
   -11650,14403,-7003,0,10056,6322,-9884,5751,0,-4950,4130,0,-3958,0,3258,2616,-1897,-2117,
    2354,0,0,-1423,-1117,-1571,-1739,0,-4421,0,0,0,0,1165,0,0,8752];             
    
    var bTerms = [
    5128122,280602,277693,173237,55413,46271,32573,17198,9266,8822,8216,4324,4200,-3359,2463,
    2211,2065,-1870,1828,-1794,-1749,-1565,-1491,-1475,-1410,-1344,-1335,1107,1021,833,777,671,
    607,596,491,-451,439,422,421,-366,-351,331,315,302,-283,-229,223,223,-220,-220,-185,181,-177,
    176,166,-164,132,-119,115,107];
   
    var lprime,d,m,mprime,f,a1,a2,a3,e=[],sigmaL=0,sigmaB=0,sigmaR=0,ang,today=new Date(),t;
    if (!transit) t=(calc_julian_date(time.getHours(),time.getMinutes(),tz,transit)-2451545.0)/36525.0;
    else          t=(calc_julian_date(today.getHours(),today.getMinutes(),tz,transit)-2451545.0)/36525.0; 
    var t4 = t*t*t*t;
    var t3 = t*t*t;
    var t2 = t*t;
   
    lprime = mod2pi((218.3164591 + 481267.88134236*t - 0.0013268*t2 + t3 / 538841.0 - t4 / 65194000.0)*RADS);
    d = mod2pi((297.8502042 + 445267.1115168*t - 0.00163*t2 + t3 / 545868.0 - t4 / 113065000.0)*RADS);
    m = mod2pi((357.5291092 + 35999.0502909*t - 0.0001536*t2 + t3 / 24490000.0)*RADS);
    mprime = mod2pi((134.9634114 + 477198.8676313*t + 0.008997*t2 + t3 / 69699.0 - t4 / 14712000.0)*RADS);
    f = mod2pi((93.2720993 + 483202.0175273*t - 0.0034029*t2 - t3 / 3526000.0 + t4 / 863310000.0)*RADS);
   
    a1 = mod2pi((119.75 + 131.849 * t)*RADS);
    a2 = mod2pi((53.09 + 479264.29 * t)*RADS);
    a3 = mod2pi((313.45 + 481266.484 * t)*RADS);
   
    e[0] = 1;
    e[1] = 1 - 0.002516 * t - 0.0000074 * t2;
    e[2] = e[1] * e[1];
   
    for (i = 0; i < 60; i++) {
        ang = lrCoeff[i][0] * d + lrCoeff[i][1] * m + lrCoeff[i][2] * mprime + lrCoeff[i][3] * f;
        sigmaL += lTerms[i] * Math.sin(ang) * e[Math.abs(lrCoeff[i][1])];
        
        if (rTerms[i] != 0)  {
            sigmaR += rTerms[i] * Math.cos(ang) * e[Math.abs(lrCoeff[i][1])];
        }
        
        ang = bCoeff[i][0] * d + bCoeff[i][1] * m + bCoeff[i][2] * mprime + bCoeff[i][3] * f;
        sigmaB += bTerms[i] * Math.sin(ang) * e[Math.abs(bCoeff[i][1])];
    }
    
    sigmaL +=   3958.0 * Math.sin(a1) + 1962.0 * Math.sin(lprime - f) + 318.0 * Math.sin(a2);
    sigmaB += - 2235.0 * Math.sin(lprime) + 382.0  * Math.sin(a3) + 175.0 * Math.sin(a1 - f) 
              +  175.0 * Math.sin(a1 + f) + 127.0 * Math.sin(lprime - mprime) 
              -  115.0 * Math.sin(lprime + mprime);
    
    l = mod2pi(((lprime*DEGS) + sigmaL / 1000000.0)*RADS)*DEGS;
    
    return l;
}

function _ecl (jd)
{
    /* J. Laskar, Astronomy and Astrophysics, Vol. 157, page 68 [1986] */
        
    var terms = [ -4680.93/3600.0,   -1.55/3600.0,  1999.25/3600.0, 
                   -51.38/3600.0, -249.67/3600.0,  -39.05/3600.0, 
                    7.12/3600.0,   27.87/3600.0,   5.79/3600.0,   2.45/3600.0 ];
    
    var eps = 23 + (26 / 60.0) + (21.448 / 3600.0); 
    var u=0, v=0;
    var cy = jd / 36525.0;
    v = u = (jd - 2415020.0) / (cy * 100);
    
    if (Math.abs(u) < 1.0) {
        for (var i = 0; i < 10; i++) {
            eps += terms[i] * v;
            v *= u;
        }
    }
    
    return eps;
}

function dT (transit)
{
    /*   http://eclipse.gsfc.nasa.gov/SEhelp/deltaT.html
     *  
     *   Terrestrial Dynamical Time (TD), Universal Time (UT) 
     *   The parameter delta-T (ΔT) is the arithmetic difference,
     *   in seconds, between the two as: ΔT = TD - UT 
     */
    
    var today=new Date(),y;
    if (!transit) y = date.getFullYear()  + ((date.getMonth()+1)  - 0.5)/12;
    else          y = today.getFullYear() + ((today.getMonth()+1) - 0.5)/12;
        
    var c = -0.000012932 * Math.pow((y - 1955),2);
    var dt=0, u=0, t=0;
    t2 = t*t;
    t3 = t*t*t;
    t4 = t*t*t*t;
    t5 = t4*t;
    t6 = t5*t;
    t7 = t6*t;
    
    if (y <= -500) {
        u  = (y - 1820)/100;
        dt = -20 + 32 * u*u + c;
    }
    else if (y < -500 && y <= 500) {
        u  = y/100;
        dt = 10583.6 - 1014.41 * u + 33.78311 * u*u - 5.952053 * u*u*u
              - 0.1798452 * u*u*u*u + 0.022174192 * u*u*u*u*u + 0.0090316521 * u*u*u*u*u*u + c;
    }
    else if (y > 500 && y <= 1600) {
        u  = (y - 1000)/100;
        dt = 1574.2 - 556.01 * u + 71.23472 * u*u + 0.319781 * u*u*u
             - 0.8503463 * u*u*u*u - 0.005050998 * u*u*u*u*u + 0.0083572073 * u*u*u*u*u*u + c;
    }
    else if (y > 1600 && y <= 1700) {
        t  = (y - 1600);
        dt = 120 - 0.9808 * t - 0.01532 * t2 + t3 / 7129 + c;
    }
    else if (y > 1700 && y <= 1800) {
        t  = (y - 1800);
        dt = 13.72 - 0.332447 * t + 0.0068612 * t2 + 0.0041116 * t3 
             - 0.00037436 * t4 + 0.0000121272 * t5 - 0.0000001699 * t6 
             + 0.000000000875 * t7 + c;
    }
    else if (y > 1860 && y <= 1900) {
        t  = (y - 1860);
        dt = 7.62 + 0.5737 * t - 0.251754 * t2 + 0.01680668 * t3
             -0.0004473624 * t4 + t5 / 233174 + c;
    }
    else if (y > 1900 && y <= 1920) {
        t  = (y - 1920);
        dt = 21.20 + 0.84493 * t - 0.076100 * t2 + 0.0020936 * t3 + c;
    }
    else if (y > 1941 && y <= 1961) {
        t  = (y - 1950);
        dt =  29.07 + 0.407 * t - t2 / 233 + t3 / 2547;
    }
    else if (y > 1961 && y <= 1986) {
        t  = (y - 1975);
        dt = 45.45 + 1.067 * t - t2 / 260 - t3 / 718;
    }
    else if (y > 1986 && y <= 2005) {
        t  = (y - 2000);
        dt = 3.86 + 0.3345 * t - 0.060374 * t2 + 0.0017275 * t3 
             + 0.000651814 * t4 + 0.00002373599 * t5;
    }
    else if (y > 2005 && y <= 2050) {
        t  = (y - 2000);
        dt = 62.92 + 0.32217 * t + 0.005589 * t2 + c;
    }
    else if (y > 2050 && y <= 2150) {
        dt = -20 + 32 * ((y-1820)/100)*((y-1820)/100) - 0.5628 * (2150 - y) + c;
    }
    else if (y > 2150) {
        u  = (y-1820)/100;
        dt = -20 + 32 * u*u + c;
    }
    
    return dt;
}

function dms2real (deg, min, sec)
{
    /*  convert latitude/longitude (deg, min, sec) to degrees  */
   
    var r;
    if (deg < 0) r =  deg - min/60 - sec/3600;
    else         r =  deg + min/60 + sec/3600;       
    
    return r;
}
 
function hms2deg (hours, min, sec)
{
    /*  convert right ascension to degrees 
        hours*15.0+(min/60.0)*15.0+(sec/3600.0)*15.0;
     */
    
     return (hours * 15 + min/4 + sec/240);
}

function dec2hms (x)
{
    /*  convert dec hours to hh:mm:ss  */
   
    if (isNaN(x)) return ("00:00:00");
     
    var st = x;
    var s  = st;      
    st     = st; 
    
    var d = Math.floor( s );
    
    s = s - d;
    s = s * 60;
    var mm = Math.floor( s );
    
    var hour = Math.floor( st );
    
    st  = st - hour;
    st  = st * 60;
    var minute = Math.floor( st );
    
    st  = st - minute;
    st  = st * 60;
    var second = Math.floor( st );
    
    var str = ((hour  <10) ?  "0" :  "") + hour;
    str    += ((minute<10) ? ":0" : ":") + minute;
    str    += ((second<10) ? ":0" : ":") + second;
    
    return str;
}

function deg2hms (x)
{
    /* convert degrees to hh:mm:ss */
    
    if (isNaN(x)) return ("00:00:00");
     
    var st = x;
    var s  = st;      
    st     = st / 15.0; 
    
    var d = Math.floor( s );
    
    s = s - d;
    s = s * 60;
    var mm = Math.floor( s );
    
    var hour = Math.floor( st );
    
    st  = st - hour;
    st  = st * 60;
    var minute = Math.floor( st );
    
    st  = st - minute;
    st  = st * 60;
    var second = Math.floor( st );
    
    var str = ((hour  <10) ?  "0" :  "") + hour;
    str    += ((minute<10) ? ":0" : ":") + minute;
    str    += ((second<10) ? ":0" : ":") + second;
    
    return str;
}

function dec2date (etime)
{
    /* convert dec number to dd/mm/yyyy */
    
    if (isNaN(etime)) return ("00/00/0000");
    
    var s = etime;
    var tmp = Math.round(s);
    var year = parseInt(date.getFullYear() - tmp);
    
    s = s - tmp;
    var tmp0 = Math.round(s*12);
    var month = parseInt((12-tmp0)+(date.getMonth()+1) - 12);
    if (isNaN(month) || month<0) month=1;
    
    var tmp1 = Math.round(s*12);
    var tmp2 = Math.abs(tmp1 - (s*12));
    var tmp3 = Math.round(tmp2*30);
    var day  = Math.abs((30-date.getDate())-tmp3);
    
    var str = ((day   <10) ?  "0" :  "") + day;
    str    += ((month <10) ? "/0" : "/") + month;
    str    += ((year<1000) ? "/0" : "/") + year;
    
    return str;
}

function _abs (x)
{
    var r;
    if (x >= 0.0) r = Math.floor(x);
    else          r = Math.ceil(x);
    
    return r;
}

function mod24 (x)
{
    return (x + 24) % 24;
}

function mod2pi(x)
{
    /* range 0-2PI radians */
    
    var b = x/(2*Math.PI);
    var a = (2*Math.PI)*(b - _abs(b));
    if (a < 0) a = (2*Math.PI) + a;
   
    return a;
}

function mod360 (x) 
{
    /* range 0-360 degrees */
    
    var a = 360 * ((x / 360) - _abs(x / 360));
    if (a < 0) a = a + 360; 
   
    return a;
}

function calc_moon_acending_node (transit) 
{ 
    /*   http://idlastro.gsfc.nasa.gov
     *   Q.What is the licensing for the IDL Astronomy Library?
     *   A.The IDL Astronomy Library procedures are in the public domain. 
     */

    var T,today=new Date(),ay,n;
    if (!transit) T=(calc_julian_date(time.getHours(),time.getMinutes(),tz,transit)-2415020.5)/36525.0;
    else          T=(calc_julian_date(today.getHours(),today.getMinutes(),tz,transit)-2415020.5)/36525.0;
    ay = calc_ayanamsa (transit);
    
    /* compute longitude of Moon's ascending node */
    n  = mod2pi((259.183275 - 1800*T - 134.142008*T + 0.002078*T*T)*RADS)*DEGS;
    
    return (n-ay);
}

function calc_ayanamsa (transit)
{
    /*   The longitudinal difference between the
     *   Tropical(Sayana) and Sidereal(Nirayana) zodiacs.
     */

    var d,today=new Date(),yy,mm,dd;
    if (!transit) {
        yy=date.getFullYear();
        mm=date.getMonth()+1;
        dd=date.getDate();
    }
    else {
        yy=today.getFullYear();
        mm=today.getMonth()+1;
        dd=today.getDate();
    }
    if (yy < 100)  d = 10.;
    else         d = 1000.;
    var c = yy*1.0/d;
    var a = -6.92416+16.90709*c-0.757371*c*c;
    var b = (mm + dd/30.)*1.1574074/d;
    
    return (a + b);
}

function calc_ascendant (hours,minutes,transit)
{       
    /*   tan(asc) = cos(t) / -(sin(t)*cos(ecl) + tan(lat)*sin(ecl))
     *   t   -  local sidereal time
     *   ecl -  obliquity of the ecliptic. Standard equinox J2000.0 use 23.4392911°
     *   lat -  local latitude (Southern latitudes are negative, Northern positive)
     */

    var t   = calc_sideral_time(hours,minutes,transit); 
    var ecl = _ecl(calc_julian_date(hours,minutes,tz,transit));
  
    var asc = Math.atan2(Math.cos(t*RADS), -Math.sin(t*RADS)*Math.cos(ecl*RADS) 
                                           -Math.tan(lat*RADS)*Math.sin(ecl*RADS));
                                             
    return (asc*DEGS);
}                           

function calc_tithi(transit)
{
    /*   The angle between Sun and the Moon
     *   Tithi = (Moon Longitude - Sun Longitude) / 12
     *   K - Krishna, S - Sukla, 
     *   K.Pratipada - Waning Moon(darker phase), S.Pratipada - Waxing Moon(brighter phase)
     * 
     *   Swara ancient scince of breath
     *   Pingala Nadi   - right nostril(left brain hemisphere) 
     *   Ida Nadi       - left nostril(right brain hemisphere)
     *   Shushumna Nadi - both nostril(central channel)
     */ 
     
     /* Sunrise swara, for Sunset swara reverse sunrise swara */
     var tithi = ["1/K.Pratipada/Pin.",  "2/K.Dvitiya/Pin.",   "3/K.Tritiya/Pin.",   
                  "4/K.Chaturthi/Ida",   "5/K.Panchami/Ida",   "6/K.Shashthi/Ida",     
                  "7/K.Saptami/Pin.",    "8/K.Ashtami/Pin.",   "9/K.Navami/Pin.",
                  "10/K.Dasami/Ida",     "11/K.Ekadasi/Ida",   "12/K.Dwadasi/Ida",    
                  "13/K.Trayodasi/Pin.", "14/K.Chaturd./Pin.", "15/K.Amavasya/Pin.",
                  "1/S.Pratipada/Ida",   "2/S.Dvitiya/Ida",    "3/S.Tritiya/Ida",
                  "4/S.Chaturthi/Pin.",  "5/S.Panchami/Pin.",  "6/S.Shashthi/Pin.",
                  "7/S.Saptami/Ida",     "8/S.Ashtami/Ida",    "9/S.Navami/Ida",
                  "10/S.Dasami/Pin.",    "11/S.Ekadasi/Pin.",  "12/S.Dwadasi/Pin.",
                  "13/S.Trayodasi/Ida",  "14/S.Chaturd./Pin.", "15/S.Purnima/Ida"];
    
    var ay = calc_ayanamsa(transit),today=new Date();;
    if (!transit) var jd = calc_julian_date(time.getHours(),time.getMinutes(),tz,transit);
    else          var jd = calc_julian_date(today.getHours(),today.getMinutes(),tz,transit);
    var tlon = ((calc_moon_positionIII(transit)-ay) - (calc_vsop87(1,jd)-ay))/12;  
    
    if      (tlon > 15)             tlon -=15;
    else if (tlon < 15 && tlon > 0) tlon +=15;
    else if (tlon > 30)             tlon -=30;  
    else if (tlon <  0)   tlon = Math.round(Math.abs(tlon*2)); 
   
    return (tithi[Math.round(Math.abs(Math.floor(tlon)))]);
}

function calc_day_lord (transit)
{
    var jd  = calc_julian_date(time.getHours(),time.getMinutes(),0,transit);
    var day = (Math.floor(jd + 0.5) + 1) % 7;
    var str;
    
    switch (day) {
        case 0:
            str="Sun";
            break;
        case 1:
            str="Moon";
            break;
        case 2:
            str="Mars";         
            break;
        case 3:
            str="Mercury";                
            break;
        case 4:
            str="Jupiter";         
            break;
        case 5:  
            str="Venus";       
            break;
        case 6:
            str="Shani";         
            break;
        default:
            str="NaN"; 
    }
        
    return (str);
}

function calc_hora_lord (transit)
{
    var lords = ["Sun","Venus","Mercury","Moon","Shani","Jupiter","Mars"];
    var hour=[], lord=[], currentlord, currenthour,today=new Date();
    
    if (!transit)  currenthour = (time.getHours()  + time.getMinutes()/60);
    else           currenthour = (today.getHours() + today.getMinutes()/60);
    var daylord    = calc_day_lord (transit);
    var index      = lords.indexOf(daylord);
    var todayrise    = calc_sunriseset(true, false, false, transit);
    var todayset     = calc_sunriseset(false,false, false, transit);
    var tomorrowrise = calc_sunriseset(true, true,  false, transit); 
    
    var daylength    =  ((todayset      - todayrise) / 12);
    var nightlength  =  (((24-todayset) + tomorrowrise) / 12);
    
    hour[0]  = todayrise;
    for (var i=1; i<12; i++)  {  hour[i] = hour[i-1] + daylength;   }
    hour[12] = todayset;
    for (var i=13; i<25; i++) {  hour[i] = hour[i-1] + nightlength; }
    
    lord[0]  = lords[index];
    for (var i=1; i<25; i++)  {
         if (index > 5) { index = -1; }
         lord[i] = lords[index+1];
         index++;
    }
    for (var i=0; i<24; i++) {
         if (currenthour < (tomorrowrise))
         currenthour +=24;
         if ((currenthour >= hour[i]) && (currenthour <= hour[i+1]))
              currentlord = lord[i];
    }
    
    return currentlord;
}

function calc_sunriseset (rising,hora,hms,transit)
{       
   /*   Almanac for Computers, 1990
    *   published by Nautical Almanac Office
    *   United States Naval Observatory, Washington, DC 20392 
    */
    
   var offical      = (90+(50/60));// 90°50'00"
   var civil        = 96;          // 96°00'00"
   var nautical     = 102;         //102°00'00" 
   var astronomical = 108;         //108°00'00"
    
   var zenith = offical; 
    
   /* Day of the Year */
   var today=new Date(),yy,mm,dd,tzdls;
   if (!transit) {
         yy=date.getFullYear();
         mm=date.getMonth()+1;
         dd=date.getDate();
         tzdls=tz;
   }
   else {
         yy=today.getFullYear();
         mm=today.getMonth()+1;
         dd=today.getDate();
         tzdls = -(today.getTimezoneOffset() / 60);
   }
   var a = Math.floor(275 * mm / 9);
   var b = Math.floor((mm + 9) / 12);
   var c = (1 + Math.floor((yy - 4 * Math.floor(yy / 4) + 2) / 3));
   var n  = hora ? a - (c*b) + (dd+1) - 30 : a - (c*b) + dd - 30;
   var lonhour = lon / 15;
    
   if (rising) var t = n + ((6 -lonhour)/24);
   else        var t = n + ((18-lonhour)/24);
    
   var Ms = (0.9856 * t) - 3.289;
    
   var Ls = mod360(Ms + (1.916 * Math.sin(Ms*RADS)) + (0.020*Math.sin(2*Ms*RADS)) + 282.634);
   var ra = mod360(Math.atan(0.91764 * Math.tan(Ls*RADS))*DEGS);
   var Lquadrant  = (Math.floor(Ls/90)) * 90;
   var RAquadrant = (Math.floor(ra/90)) * 90;
   ra = (ra + (Lquadrant - RAquadrant)) / 15;
    
   var sind = 0.39782 * Math.sin(Ls*RADS)
   var cosd = Math.cos((Math.asin(sind)*DEGS)*RADS);
   var cosh = (Math.cos(zenith*RADS) - (sind * Math.sin(lat*RADS))) / (cosd * Math.cos(lat*RADS));
   if      (cosh >  1) { return '00:00:00'; }
   else if (cosh < -1) { return '00:00:00'; }
   else {
           var h  = rising ? (360-(Math.acos(cosh)*DEGS))/15 : (Math.acos(cosh)*DEGS)/15;
           var tm = h + ra - (0.06571 * t) - 6.622;
           var UT = mod24(tm-lonhour) + (1.0*tzdls);
           if ( UT < 0 ) UT += 24; UT %= 24;
   }
    
   /*   High accuracy
    *   Sunrise[t] = Rising Sign[deg] = The Sun's longitude[deg]
    */
   var sunhour = parseInt(UT);
   var jd, rsun, asc, rsunrise, rsunset, sunminute=0;
   
   //  Related to mobile platform
   //  If does not work, comment out all code between 1912-1952
   //  then left only: return hms ? dec2hms(UT) : (UT);
   var browser = navigator.userAgent.toLowerCase();
   
   if((browser.indexOf("firefox") > -1) ||
      (browser.indexOf("chrome")  > -1) ||
      (browser.indexOf("msie")    > -1)) {
      
       if (rising) {
       try
          {
              for (sunminute=0; sunminute<63; sunminute++) {
                 jd   = calc_julian_date(sunhour,sunminute,tz,transit);
                 if (tzdls != tz) asc  = (Math.floor(calc_ascendant(sunhour-1, sunminute,transit)));
                 else             asc  = (Math.floor(calc_ascendant(sunhour,   sunminute,transit)));
                 rsun = (Math.floor(calc_vsop87(1,jd)));
                 if(asc  < 0.0)asc  += 360;if(asc  > 360)asc  -= 360;
                 if(rsun < 0.0)rsun += 360;if(rsun > 360)rsun -= 360;
                 if (rsun == asc) {
                     sunminute++ 
                     break;
                 }
              }
           } catch(e) { return hms ? dec2hms(UT) : (UT); }
        }
        if (!rising) {
        try
           {
              for (sunminute=0; sunminute<63; sunminute++) {
                 jd   = calc_julian_date(sunhour,sunminute,tz,transit);
                 if (tzdls != tz) asc  = (Math.floor(calc_ascendant(sunhour-1, sunminute,transit)));
                 else             asc  = (Math.floor(calc_ascendant(sunhour,   sunminute,transit)));
                 rsun = (Math.floor(calc_vsop87(1,jd))+180);
                 if(asc  < 0.0)asc  += 360;if(asc  > 360)asc  -= 360;
                 if(rsun < 0.0)rsun += 360;if(rsun > 360)rsun -= 360;
                 if (rsun == asc) {
                     sunminute++
                     break;
                 }
              }
           } catch(e) { return hms ? dec2hms(UT) : (UT); }
        }
        return hms ? dec2hms(sunhour+((sunminute)/60)) : (sunhour+((sunminute)/60)); 
   }
   else
        return hms ? dec2hms(UT) : (UT);
}

function calc_all_vimsottari_dasa ()
{

    var lord   = ["Me","Ke","Ve","Su","Mo","Ma","Ra","Ju","Sa"];
    var tdasa  = [6209.116431424950, 2556.695001174980, 7304.842860499940,
                  2191.452858149980, 3652.421430249970, 2556.695001174980,
                  6574.358574449950, 5843.874288399950, 6939.600717474940];
    var dasa_year = [17,7,20,6,10,7,18,16,19];

    const dasa_seq ={
        "Me":["Me","Ke","Ve","Su","Mo","Ma","Ra","Ju","Sa"],
        "Ke":["Ke","Ve","Su","Mo","Ma","Ra","Ju","Sa","Me"],
        "Ve":["Ve","Su","Mo","Ma","Ra","Ju","Sa","Me","Ke"],
        "Su":["Su","Mo","Ma","Ra","Ju","Sa","Me","Ke","Ve"],
        "Mo":["Mo","Ma","Ra","Ju","Sa","Me","Ke","Ve","Su"],
        "Ma":["Ma","Ra","Ju","Sa","Me","Ke","Ve","Su","Mo"],
        "Ra":["Ra","Ju","Sa","Me","Ke","Ve","Su","Mo","Ma"],
        "Ju":["Ju","Sa","Me","Ke","Ve","Su","Mo","Ma","Ra"],
        "Sa":["Sa","Me","Ke","Ve","Su","Mo","Ma","Ra","Ju"]
    }  

    const dasa_year_seq ={
        "Me":[17,7,20,6,10,7,18,16,19],
        "Ke":[7,20,6,10,7,18,16,19,17],
        "Ve":[20,6,10,7,18,16,19,17,7],
        "Su":[6,10,7,18,16,19,17,7,20],
        "Mo":[10,7,18,16,19,17,7,20,6],
        "Ma":[7,18,16,19,17,7,20,6,10],
        "Ra":[18,16,19,17,7,20,6,10,7],
        "Ju":[16,19,17,7,20,6,10,7,18],
        "Sa":[19,17,7,20,6,10,7,18,16] 
    }        
    
    var jd =  calc_julian_date(time.getHours(),time.getMinutes(),0,false);
    var Ts = (jd - 2415020.0)/36525.0;
    var Tm = (jd - 2451545.0)/36525.0;
    
    /*  Tropical month */
    var tropmonth = 27.321661547  + 0.000000001857 * date.getFullYear();
    /*  Synodic month */
    var synmonth  = 29.5305888531 + 0.00000021621*Tm - 3.64*(10e-10)*Tm*Tm;
    
    /*  Mean Tropical year(solar year), McCarthy & Seidelmann, 2009, page.18, J. Laskar [1986] */
    var solaryear   = 365.2421896698-6.15359*(10e-6)*Ts-7.29*(10e-10)*Ts*Ts+2.64*(10e-10)*Ts*Ts*Ts; 
    var sideralyear = solaryear + (1 + (1/26000));
    var savanayear  = 360;
    var lunaryear   = 12 * synmonth;
    
    var sideralday  = 24 * solaryear/sideralyear;
    var civilday    = 24 * 86400/60/60/24;
    var synodicday  = 24 * 360/sideralyear;
    var ratio       = 1/100273790935;
    
    var ay    = calc_ayanamsa(false);
    var moon  = mod360(calc_moon_positionIII(false) - ay);
    var sdeg  = calc_nakshatra(mygrahas[2].getra(),4);
    var nlord = calc_nakshatra(mygrahas[2].getra(),2);
    
    var index  = lord.indexOf(nlord);
    var period = tdasa[lord.indexOf(nlord)];
    
    /*  Dasa balance
        http://www.saravali.de/articles/dasa_balance.html 
     */

    Date.prototype.addMinutes = function(minutes) {
        this.setMinutes(this.getMinutes() + minutes);
        return this;
    };
    var balance  = ((moon - sdeg) / 13.3333);
    var lbalance = 1 - balance;
    var etime    = Math.abs(balance * (period/solaryear));

    var ta=0, tp=0, mlord=nlord, alord, plord, cmlord, calord, cplord,
    today=new Date(), currentmaha=0, indexcurrent=index, year;
    var ayear = (today.getFullYear()*solaryear)+((today.getMonth()+1)*30)+today.getDate();
    var byear = (date.getFullYear()*solaryear)+((date.getMonth()+1)*30)+date.getDate();
    var tyear = ayear - byear;

    var _t = new Date(dec2date(etime));
    var ma_arr = [];
    var pa_array = [];
    ma_arr.push(nlord + ": " +  _t.toISOString().split('T')[0] + "\t" + dasa_seq[nlord].join('-')); //
    var j = 0;
    var j1 = 0;
    var j2 = 0;
    var c = _t;
    // console.log(dasa_seq[nlord][i] + " " +  c.toISOString().split('T')[0]);
    for(var i=0; i<9; i++) {
        var th_y = 7 ;
        j2 = dasa_year_seq[nlord][i];
        j = ((th_y * j2 )/ 120)
        j1 = j * 365 * 24 * 60;
        _t.addMinutes(j1)
        console.log(th_y, j2, j);
        var c = new Date(_t); 
        console.log(dasa_seq[nlord][i] + " " +  c.toISOString().split('T')[0]);
    }


    for(var i=0; i<9; i++) {
        if(indexcurrent > 8) {
            indexcurrent = 0;
        }  
        var year = _t.getFullYear();
        var month = _t.getMonth();
        var day = _t.getDate();

        var c = new Date(year + dasa_year[indexcurrent], month, day);
        _t  = c;
        indexcurrent++;  
        ma_arr.push(lord[indexcurrent>8? 0 : indexcurrent] + ": " + c.toISOString().split('T')[0]+ "\t" + dasa_seq[lord[indexcurrent>8? 0 : indexcurrent]].join('-'));  
                 
    }        

/* 
Mars Dasha:
Me 1987-6-16  Ke 1987-9-30  Ve 1988-2-26  
Su 1989-4-27  Mo 1989-9-2  
Rahu Dasha:
Ra 1990-4-3  Ju 1992-12-14  Sa 1995-5-10  
Me 1998-3-16  Ke 2000-10-2  Ve 2001-10-21  
Su 2004-10-21  Mo 2005-9-14  Ma 2007-3-16  
Jupiter Dasha:
Ju 2008-4-3  Sa 2010-5-22  Me 2012-12-2  
Ke 2015-3-10  Ve 2016-2-14  Su 2018-10-15  
Mo 2019-8-3  Ma 2020-12-2  Ra 2021-11-8  
Saturn Dasha:
Sa 2024-4-3  Me 2027-4-6  Ke 2029-12-15  
Ve 2031-1-23  Su 2034-3-25  Mo 2035-3-7  
Ma 2036-10-5  Ra 2037-11-14  Ju 2040-9-20  
Mercury Dasha:
Me 2043-4-3  Ke 2045-8-30  Ve 2046-8-27  
Su 2049-6-27  Mo 2050-5-4  Ma 2051-10-3  
Ra 2052-9-29  Ju 2055-4-19  Sa 2057-7-25  
Ketu Dasha:
Ke 2060-4-3  Ve 2060-8-30  Su 2061-10-30  
Mo 2062-3-7  Ma 2062-10-6  Ra 2063-3-4  
Ju 2064-3-22  Sa 2065-2-25  Me 2066-4-6  
Venus Dasha:
Ve 2067-4-3  Su 2070-8-3  Mo 2071-8-3  
Ma 2073-4-3  Ra 2074-6-3  Ju 2077-6-3  
Sa 2080-2-2  Me 2083-4-3  Ke 2086-2-1  
Sun Dasha:
Su 2087-4-3  Mo 2087-7-22  Ma 2088-1-21  
Ra 2088-5-27  Ju 2089-4-21  Sa 2090-2-7  
Me 2091-1-20  Ke 2091-11-27  Ve 2092-4-3  
Moon Dasha:
Mo 2093-4-3  Ma 2094-2-1  Ra 2094-9-2  
Ju 2096-3-3  Sa 2097-7-3  Me 2099-2-2  
Ke 2100-7-4  Ve 2101-2-2  Su 2102-10-4 
*/
    return ma_arr;
}    

function calc_vimsottari_dasa (d)
{
    var lord   = ["Me","Ke","Ve","Su","Mo","Ma","Ra","Ju","Sa"];
    var tdasa  = [6209.116431424950, 2556.695001174980, 7304.842860499940,
                  2191.452858149980, 3652.421430249970, 2556.695001174980,
                  6574.358574449950, 5843.874288399950, 6939.600717474940];
    
    var jd =  calc_julian_date(time.getHours(),time.getMinutes(),0,false);
    var Ts = (jd - 2415020.0)/36525.0;
    var Tm = (jd - 2451545.0)/36525.0;
    
    /*  Tropical month */
    var tropmonth = 27.321661547  + 0.000000001857 * date.getFullYear();
    /*  Synodic month */
    var synmonth  = 29.5305888531 + 0.00000021621*Tm - 3.64*(10e-10)*Tm*Tm;
    
    /*  Mean Tropical year(solar year), McCarthy & Seidelmann, 2009, page.18, J. Laskar [1986] */
    var solaryear   = 365.2421896698-6.15359*(10e-6)*Ts-7.29*(10e-10)*Ts*Ts+2.64*(10e-10)*Ts*Ts*Ts; 
    var sideralyear = solaryear + (1 + (1/26000));
    var savanayear  = 360;
    var lunaryear   = 12 * synmonth;
    
    var sideralday  = 24 * solaryear/sideralyear;
    var civilday    = 24 * 86400/60/60/24;
    var synodicday  = 24 * 360/sideralyear;
    var ratio       = 1/100273790935;
    
    var ay    = calc_ayanamsa(false);
    var moon  = mod360(calc_moon_positionIII(false) - ay);
    var sdeg  = calc_nakshatra(mygrahas[2].getra(),4);
    var nlord = calc_nakshatra(mygrahas[2].getra(),2);
    
    var index  = lord.indexOf(nlord);
    var period = tdasa[lord.indexOf(nlord)];
    
    /*  Dasa balance
        http://www.saravali.de/articles/dasa_balance.html 
     */
    var balance  = ((moon - sdeg) / 13.3333);
    var lbalance = 1 - balance;
    var etime    = Math.abs(balance * (period/solaryear));

    // Math.abs(balance * (tdasa[lord.indexOf(nlord)];/solaryear));
    
    var ta=0, tp=0, mlord=nlord, alord, plord, cmlord, calord, cplord,
    today=new Date(), currentmaha=0, indexcurrent=index, year;
    var ayear = (today.getFullYear()*solaryear)+((today.getMonth()+1)*30)+today.getDate();
    var byear = (date.getFullYear()*solaryear)+((date.getMonth()+1)*30)+date.getDate();
    var tyear = ayear - byear;
    
    /* Vimsottari Antardasa */
    for(var i=0; i<9; i++) {
        if (index > 8) index = 0;
        ta += tdasa[index]/solaryear/120;
        if(ta > balance) { alord = lord[index]; break; }
        index++; 
    }   
    /* Vimsottari Pratyantardasa */
    ta = 1 - ((ta - balance) / (tdasa[index]/solaryear/120)); 
    for(var i=0; i<9; i++) {
        if(index > 8) index = 0;
        tp += tdasa[index]/solaryear/120;
        if(tp > ta) { plord = lord[index]; break; } 
        index++;
    }
    /* Current Vimsottari Maha Dasa */
    var nbalance = (lbalance * tdasa[indexcurrent]);
    year = (ayear-(byear+nbalance)); indexcurrent++; ta = 0; 
    for(var i=0; i<9; i++) {
        if(indexcurrent > 8) indexcurrent = 0;
        ta += tdasa[indexcurrent];
        if(ta > year) { cmlord = lord[indexcurrent]; break; } 
        indexcurrent++;
    }
    /* Current Vimsottari Antardasa */
    year = 1 - (ta - year)/tdasa[indexcurrent]; ta = 0;
    for(var i=0; i<9; i++) {
        if(indexcurrent > 8) indexcurrent = 0;
        ta += tdasa[indexcurrent]/solaryear/120;
        if(ta > year) { calord = lord[indexcurrent]; break; } 
        indexcurrent++;
    }
    /* Current Vimsottari Pratyantardasa */
    tp = 0; ta = 1 - ((ta - year) / (tdasa[indexcurrent]/solaryear/120)); 
    for(var i=0; i<9; i++) {
        if(indexcurrent > 8) indexcurrent = 0;
        tp += tdasa[indexcurrent]/solaryear/120;
        if(tp > ta) { cplord = lord[indexcurrent]; break; } 
        indexcurrent++;
    }
    
    var tstr   =  dec2date (etime);
    
    var nowstr = " ";
    nowstr    += (((today.getDate())    <10)   ?  "0" :  "") + (today.getDate());
    nowstr    += (((today.getMonth()+1) <10)   ? "/0" : "/") + (today.getMonth()+1);
    nowstr    += (((today.getFullYear())<1000) ? "/0" : "/") + (today.getFullYear());
    
    var nstr = "" ;
    nstr    += mlord; //    M.Lord
    nstr    += "/";
    nstr    += alord; //    A.Lord
    nstr    += "/";
    nstr    += plord; //    P.Lord
    nstr    += "     ";
    nstr    += cmlord;// C. M.Lord
    nstr    += "/";
    nstr    += calord;// C. A.Lord
    nstr    += "/";
    nstr    += cplord;// C. P.Lord
    
    return d ? tstr+" "+nowstr : nstr;
    // return d ? nowstr : nstr;
}

function onmousedown (e)
{
    var x, y,d="D";
    var canvas_chart = document.getElementById('canvas_chart');
    var mychart = canvas_chart.getContext('2d');
    e.preventDefault();

    if (e.layerX || e.layerX == 0) { 
         x = e.layerX;
         y = e.layerY;
    } 
    else if (e.offsetX || e.offsetX == 0) { 
         x = e.offsetX;
         y = e.offsetY;
    }
    
    if (x > 277 && x < 309 && y > 610 && y < 623 ) {
         calc_position(false);
         draw(false);
    }
    else if(x > 313 && x < 350 && y > 610 && y < 623 ) {
         calc_position(true);
         draw(true);
    }
    else if (x > 600 && x < 621 && y > 610 && y < 623 ) {
         if (forward <= 0)  forward = 2;
         mychart.clearRect (300, 0, 300, 200);
         draw_empty_chart (mychart,canvas_chart,330,0);
         draw_division_chart (mychart,division[forward-2],division[forward-1],d+index[forward-1]);
         forward -= 2; 
        
    }
    else if(x > 624 && x < 645 && y > 610 && y < 623 ) {
         if (forward >= 10)  forward = 8;
         mychart.clearRect (300, 0, 300, 200);
         draw_empty_chart (mychart,canvas_chart,330,0);
         draw_division_chart (mychart,division[forward],division[forward+1],d+index[forward]);
         forward += 2;  
    }
}

function onkeydown (e) 
{
    if (e.keyCode == 27)       { alert('esc');} // esc 
    else if (e.keyCode == 38)  { alert('up'); } // up
    else if (e.keyCode == 40)  { alert('down');}// down
    else if (e.keyCode == 187) { alert('+');  } // +
    else if (e.keyCode == 189) { alert('-');  } // -
}

function draw (transit)
{   
    var canvas_info = document.getElementById('canvas_info');

    var dasha_info = document.getElementById('dasha_table');

    var mydashinfo = dasha_info.getContext('2d');

    var myinfo = canvas_info.getContext('2d');
    canvas_info.onselectstart  = function () { return false; }        

    var canvas_chart = document.getElementById('canvas_chart');
    var mychart = canvas_chart.getContext('2d');
    mychart.clearRect (0, 0, canvas_chart.width, canvas_chart.height);
    canvas_chart.onselectstart = function () { return false; }

    
    
    draw_empty_chart (mychart,canvas_chart,0,0);
    draw_zodiacs (mychart);
    draw_houses (mychart);
    
    draw_empty_chart (mychart,canvas_chart,330,0);
    draw_division_chart (mychart,mynavamsaz,mynavamsah,'');

    draw_info (myinfo,canvas_info,transit);
    draw_dasha (mydashinfo, dasha_info);
}

function draw_zodiacs (canvas) 
{
    canvas.font = '7pt Arial';
    canvas.textAlign = 'center';
    canvas.fillStyle = 'black';
    
    var pos=[125,93,  62,43,   50,54,   111,104, 
             50,154,  62,165,  125,117, 188,165, 
             200,154, 139,104, 200,54,  188,43 ];
    
    canvas.fillText(myrashis[0], pos[0], pos[1]);
    canvas.fillText(myrashis[1], pos[2], pos[3]);
    canvas.fillText(myrashis[2], pos[4], pos[5]);
    canvas.fillText(myrashis[3], pos[6], pos[7]);
    canvas.fillText(myrashis[4], pos[8], pos[9]);
    canvas.fillText(myrashis[5], pos[10],pos[11]);
    canvas.fillText(myrashis[6], pos[12],pos[13]);
    canvas.fillText(myrashis[7], pos[14],pos[15]);      
    canvas.fillText(myrashis[8], pos[16],pos[17]);      
    canvas.fillText(myrashis[9], pos[18],pos[19]);  
    canvas.fillText(myrashis[9], pos[18],pos[19]);  
    canvas.fillText(myrashis[10], pos[20],pos[21]); 
    canvas.fillText(myrashis[11], pos[22],pos[23]); 
}

function draw_houses(canvas)
{
    canvas.font = '8pt Arial';
    canvas.textAlign = 'center';
    canvas.fillStyle = 'rgb(0,0,255,0.6)';
    
    var pos=[125,53,  62,13,   26,54,   62,104, 
             26,154,  62,195,  125,154, 188,195, 
             224,154, 189,104, 224,54,  188,13 ];

    /*if (mybhavas[i].length > 8) 
          canvas.font = '7pt Arial';
      else 
          canvas.font = '8pt Arial';
    */
    canvas.fillText(mybhavas[1], pos[0], pos[1]);
    canvas.fillText(mybhavas[2], pos[2], pos[3]);
    canvas.fillText(mybhavas[3], pos[4], pos[5]);
    canvas.fillText(mybhavas[4], pos[6], pos[7]);
    canvas.fillText(mybhavas[5], pos[8], pos[9]);
    canvas.fillText(mybhavas[6], pos[10],pos[11]);
    canvas.fillText(mybhavas[7], pos[12],pos[13]);
    canvas.fillText(mybhavas[8], pos[14],pos[15]);      
    canvas.fillText(mybhavas[9], pos[16],pos[17]);      
    canvas.fillText(mybhavas[10], pos[18],pos[19]); 
    canvas.fillText(mybhavas[11], pos[20],pos[21]); 
    canvas.fillText(mybhavas[12], pos[22],pos[23]);
}


function draw_info (canvas,canvas_info,transit) 
{
    canvas.font = '9pt Arial';
    canvas.textAlign = 'left';
    canvas.fillStyle = 'rgb(0,0,0,1)'; //404040
    var today = new Date();
    
    canvas.clearRect (0, 0, canvas_info.width, canvas_info.height);
        
    canvas_info.addEventListener('keydown',    onkeydown,   true);
    canvas_info.addEventListener("mousedown",  onmousedown, false);
    canvas_info.addEventListener('mouseup',    function(e)  { });
    canvas_info.addEventListener('mousewheel', function(e)  { });
    canvas_info.addEventListener('mousemove',  function(e)  { });
    canvas_info.addEventListener('contextmenu',function(e)  {
       e.preventDefault();
    });
    canvas_info.addEventListener('touchstart', function(e)  {
       e.preventDefault();
    });
    canvas_info.addEventListener('touchmove',  function(e)  {
       e.preventDefault();
    });
    canvas_info.addEventListener('touchend',   function(e)  {
       e.preventDefault();
    });



    var y=10;
    for (var i=0; i<=9; i++) {
        canvas.fillText(mygrahas[i].name, 2, y);
        y += 15;
    }
    canvas.textAlign="end";
    y = 10;
    for (var i=0; i<=9; i++) {
        canvas.fillText(Math.floor(mygrahas[i].getdegree())+'°', 52, y);
        y += 15;
    }
    canvas.textAlign="start";
    y = 10;
    for (var i=0; i<=9; i++) {
        canvas.fillText(mygrahas[i].getzodiac(), 57, y);
        y += 15;
    }
    canvas.textAlign="end";
    y = 10;
    for (var i=0; i<=9; i++) {
        canvas.fillText(mygrahas[i].ra.toFixed(3)+'°', 170, y);
        y += 15;
    }
    y = 10;
    for (var i=0; i<=9; i++) {
        canvas.fillText(mygrahas[i].retro, 26.5, y);
        y += 15;
    }
    // canvas.textAlign="left";
    // y = 10;
    // for (var i=0; i<=9; i++) {
    //     canvas.fillText("[ "+mygrahas[i].range+" ]", 175, y);
    //     y += 15;
    // }
    canvas.textAlign="left";
    y = 10;
    for (var i=0; i<=9; i++) {
        canvas.fillText(mynaksha[i], 245, y);
        y += 15;
    }
    canvas.textAlign="left";
    y = 10;
    for (var i=0; i<=9; i++) {
        canvas.fillText(mynakshap[i], 305, y);
        y += 15;
    }
    canvas.textAlign="left";
    y = 10;
    for (var i=0; i<=9; i++) {
        canvas.fillText(mynakshal[i], 315, y);
        y += 15;
    }
    // canvas.textAlign="left";
    // y = 25;
    // for (var i=1; i<=9; i++) {
    //     canvas.fillText(mygrahas[i].happy_zodiac, 340, y);
    //     y += 15;
    // }
    // canvas.textAlign="end";
    // y = 25;
    // for (var i=1; i<=9; i++) {
    //     canvas.fillText(mygrahas[i].good_friend+":)", 450, y);
    //     y += 15;
    // }
    // canvas.textAlign="left";
    // y = 25;
    // for (var i=1; i<=9; i++) {
    //     canvas.fillText(mygrahas[i].sad_zodiac, 460, y);
    //     y += 15;
    // }
    // canvas.textAlign="end";
    // y = 25;
    // for (var i=1; i<=9; i++) {
    //     canvas.fillText(mygrahas[i].bad_friend+":(", 560, y);
    //     y += 15;
    // }
    // canvas.textAlign="end";
    // y = 25;
    // for (var i=1; i<=9; i++) {
    //     canvas.fillText(mygrahas[i].aspect, 614, y);
    //     y += 15;
    // }
    
    canvas.textAlign="left";
    canvas.fillText("Ayanamsa:"+(calc_ayanamsa(transit).toFixed(4))+'°', 2, 170); 
    
    if (!transit)
        canvas.fillText("Sid. time:   "
        +(deg2hms(calc_sideral_time(time.getHours(),time.getMinutes(),transit))), 2, 185); 
    else
        canvas.fillText("Sid. time:   "
        +(deg2hms(calc_sideral_time(today.getHours(),today.getMinutes(),transit))), 2, 185); 
    
    canvas.fillText("Sunrise:"+calc_sunriseset(true,  false, true, transit), 120, 170);
    canvas.fillText("Sunset: "+calc_sunriseset(false, false, true, transit), 120, 185);
    
    canvas.fillText("Day   Lord:"+calc_day_lord(transit), 223, 170);
    canvas.fillText("Hora Lord:"+calc_hora_lord(transit), 223, 185);
    
    canvas.fillText("Tithi:"+calc_tithi(transit),  330, 185);
    canvas.fillText("Weekday:"+calc_day_of_the_week(transit), 330, 170); 
    
    if (!transit) {
        canvas.fillText("Dasa:"+calc_vimsottari_dasa(false), 461, 170);
        canvas.fillText("Time:"+calc_vimsottari_dasa(true),  461, 185);
    }
}


function draw_dasha (canvas, canvas_info) 
{
    canvas.font = '9pt Arial';
    canvas.textAlign = 'left';
    canvas.fillStyle = 'rgba(0, 0, 0, 1)'; //404040
    var today = new Date();
    
    canvas.clearRect (0, 0, canvas_info.width, canvas_info.height);
        
    canvas_info.addEventListener('keydown',    onkeydown,   true);
    canvas_info.addEventListener("mousedown",  onmousedown, false);
    canvas_info.addEventListener('mouseup',    function(e)  { });
    canvas_info.addEventListener('mousewheel', function(e)  { });
    canvas_info.addEventListener('mousemove',  function(e)  { });
    canvas_info.addEventListener('contextmenu',function(e)  {
       e.preventDefault();
    });
    canvas_info.addEventListener('touchstart', function(e)  {
       e.preventDefault();
    });
    canvas_info.addEventListener('touchmove',  function(e)  {
       e.preventDefault();
    });
    canvas_info.addEventListener('touchend',   function(e)  {
       e.preventDefault();
    });

    var maarr = calc_all_vimsottari_dasa();

    var i;
    for (i = 0; i < maarr.length; i++) {
      text = maarr[i];
      canvas.fillText(text, 2 , 20 * i + 20);
    }

}    

function draw_empty_chart (canvas,canvas_chart,_x,_y) 
{
    canvas.lineWidth = 0.4;
    canvas.strokeStyle = '000000';
    canvas.shadowColor="black";
    canvas.shadowBlur = 1;
    
    canvas_chart.addEventListener('contextmenu',function(e) {
       e.preventDefault();
    });
    canvas_chart.addEventListener("mousedown", onmousedown, false);
       
    var x=_x,y=_y;
    
    /* outer square */
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x+250, y);
    canvas.lineTo(x+250, y+200);
    canvas.lineTo(x, y+200);
    canvas.lineTo(x, y);
    canvas.lineJoin = 'round';
    canvas.stroke();
   
    /* inner square  */
    canvas.beginPath();
    canvas.moveTo(x, y+200/2);
    canvas.lineTo(x+250/2, y);
    canvas.lineTo(x+250, y+200/2);
    canvas.lineTo(x+250/2, y+200);
    canvas.lineTo(x, y+200/2);
    canvas.lineJoin = 'round';
    canvas.stroke();
    
    /* diagonals of a square */
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x+250, y+200);
    canvas.stroke();
    canvas.beginPath();
    canvas.moveTo(x, y+200);
    canvas.lineTo(x+250, y);
    canvas.stroke();
}

function draw_division_chart (canvas,zodiac,house,d)
{        
    canvas.font = '7pt Arial';
    canvas.textAlign = 'center';
    var xoffset = 330;
    var pos=[125,93,  62,43,   50,54,   111,104, 
             50,154,  62,165,  125,117, 188,165, 
             200,154, 139,104, 200,54,  188,43 ];

    canvas.fillStyle = "rgb(0,0,0,1)";
    
    canvas.fillText(zodiac[0], pos[0]+xoffset, pos[1]);
    canvas.fillText(zodiac[1], pos[2]+xoffset, pos[3]);
    canvas.fillText(zodiac[2], pos[4]+xoffset, pos[5]);
    canvas.fillText(zodiac[3], pos[6]+xoffset, pos[7]);
    canvas.fillText(zodiac[4], pos[8]+xoffset, pos[9]);
    canvas.fillText(zodiac[5], pos[10]+xoffset,pos[11]);
    canvas.fillText(zodiac[6], pos[12]+xoffset,pos[13]);
    canvas.fillText(zodiac[7], pos[14]+xoffset,pos[15]);      
    canvas.fillText(zodiac[8], pos[16]+xoffset,pos[17]);      
    canvas.fillText(zodiac[9], pos[18]+xoffset,pos[19]);  
    canvas.fillText(zodiac[9], pos[18]+xoffset,pos[19]);  
    canvas.fillText(zodiac[10], pos[20]+xoffset,pos[21]); 
    canvas.fillText(zodiac[11], pos[22]+xoffset,pos[23]); 
    
    canvas.font = '8pt Arial';
    canvas.textAlign = 'center';
    var pos=[125,53,  62,13,   26,54,   62,104, 
             26,154,  62,195,  125,154, 188,195, 
             224,154, 189,104, 224,54,  188,13 ];

    canvas.fillStyle = "rgb(255,0,0,0.6)";
    /*if (mybhavas[i].length > 8) 
          canvas.font = '7pt Arial';
      else 
          canvas.font = '8pt Arial';
    */
    canvas.fillText(house[1].replace(/As/g, ''), pos[0]+xoffset, pos[1]);
    canvas.fillText(house[2].replace(/As/g, ''), pos[2]+xoffset, pos[3]);
    canvas.fillText(house[3].replace(/As/g, ''), pos[4]+xoffset, pos[5]);
    canvas.fillText(house[4].replace(/As/g, ''), pos[6]+xoffset, pos[7]);
    canvas.fillText(house[5].replace(/As/g, ''), pos[8]+xoffset, pos[9]);
    canvas.fillText(house[6].replace(/As/g, ''), pos[10]+xoffset,pos[11]);
    canvas.fillText(house[7].replace(/As/g, ''), pos[12]+xoffset,pos[13]);
    canvas.fillText(house[8].replace(/As/g, ''), pos[14]+xoffset,pos[15]);      
    canvas.fillText(house[9].replace(/As/g, ''), pos[16]+xoffset,pos[17]);      
    canvas.fillText(house[10].replace(/As/g, ''), pos[18]+xoffset,pos[19]); 
    canvas.fillText(house[11].replace(/As/g, ''), pos[20]+xoffset,pos[21]); 
    canvas.fillText(house[12].replace(/As/g, ''), pos[22]+xoffset,pos[23]);
    
    canvas.textAlign = 'left';
    canvas.fillStyle = "#000000"; 
    canvas.fillText("Rashi Chart",2, 215);
    
    canvas.fillText(d, pos[0]+xoffset, 105);
    canvas.textAlign = 'left';
    canvas.fillStyle = "#000000"; 
    canvas.fillText("D9 - Navamsa",xoffset, 215);
}
   
