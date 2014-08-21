/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ============

 Adobe Visitor API for JavaScript version: 1.3
 Copyright 1996-2013 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com
*/
function Visitor(k,s){if(!k)throw"Visitor requires Adobe Marketing Cloud Org ID";var a=this;a.version="1.3";var h=window;h.s_c_in||(h.s_c_il=[],h.s_c_in=0);a._c="Visitor";a._il=h.s_c_il;a._in=h.s_c_in;a._il[a._in]=a;h.s_c_in++;var o=h.document,i=h.P;i||(i=null);var j=h.Q;j||(j=!0);var p=h.O;p||(p=!1);a.D=function(a){var c=0,b,e;if(a)for(b=0;b<a.length;b++)e=a.charCodeAt(b),c=(c<<5)-c+e,c&=c;return c};a.n=function(a){var c="0123456789",b="",e="",f,g=8,h=10,i=10;if(1==a){c+="ABCDEF";for(a=0;16>a;a++)f=
Math.floor(Math.random()*g),b+=c.substring(f,f+1),f=Math.floor(Math.random()*g),e+=c.substring(f,f+1),g=16;return b+"-"+e}for(a=0;19>a;a++)f=Math.floor(Math.random()*h),b+=c.substring(f,f+1),h=0==a&&9==f?3:10,f=Math.floor(Math.random()*i),e+=c.substring(f,f+1),i=0==a&&9==f?3:10;return b+e};a.J=function(){var a;!a&&h.location&&(a=h.location.hostname);if(a)if(/^[0-9.]+$/.test(a))a="";else{var c=a.split("."),b=c.length-1,e=b-1;1<b&&2>=c[b].length&&0>",ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,be,bf,bg,bh,bi,bj,bm,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cw,cx,cz,de,dj,dk,dm,do,dz,ec,ee,eg,es,eu,fi,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,im,in,io,iq,ir,is,it,je,jo,jp,kg,ki,km,kn,kp,kr,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,na,nc,ne,nf,ng,nl,no,nr,nu,om,pa,pe,pf,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tt,tv,tw,tz,ua,ug,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,yt,".indexOf(","+
c[b]+",")&&e--;if(0<e)for(a="";b>=e;)a=c[b]+(a?".":"")+a,b--}return a};a.cookieRead=function(a){var a=encodeURIComponent(a),c=(";"+o.cookie).split(" ").join(";"),b=c.indexOf(";"+a+"="),e=0>b?b:c.indexOf(";",b+1);return 0>b?"":decodeURIComponent(c.substring(b+2+a.length,0>e?c.length:e))};a.cookieWrite=function(d,c,b){var e=a.cookieLifetime,f,c=""+c,e=e?(""+e).toUpperCase():"";b&&"SESSION"!=e&&"NONE"!=e?(f=""!=c?parseInt(e?e:0):-60)?(b=new Date,b.setTime(b.getTime()+1E3*f)):1==b&&(b=new Date,f=b.getYear(),
b.setYear(f+2+(1900>f?1900:0))):b=0;return d&&"NONE"!=e?(o.cookie=encodeURIComponent(d)+"="+encodeURIComponent(c)+"; path=/;"+(b?" expires="+b.toGMTString()+";":"")+(a.m?" domain="+a.m+";":""),a.cookieRead(d)==c):0};a.d=i;a.z=function(a,c){try{"function"==typeof a?a.apply(h,c):a[1].apply(a[0],c)}catch(b){}};a.M=function(d,c){c&&(a.d==i&&(a.d={}),void 0==a.d[d]&&(a.d[d]=[]),a.d[d].push(c))};a.l=function(d,c){if(a.d!=i){var b=a.d[d];if(b)for(;0<b.length;)a.z(b.shift(),c)}};a.h=i;a.K=function(d,c,b){!c&&
b&&b();var e=o.getElementsByTagName("HEAD")[0],f=o.createElement("SCRIPT");f.type="text/javascript";f.setAttribute("async","async");f.src=c;e.firstChild?e.insertBefore(f,e.firstChild):e.appendChild(f);b&&(a.h==i&&(a.h={}),a.h[d]=setTimeout(b,a.loadTimeout))};a.I=function(d){a.h!=i&&a.h[d]&&(clearTimeout(a.h[d]),a.h[d]=0)};a.F=p;a.G=p;a.isAllowed=function(){if(!a.F&&(a.F=j,a.cookieRead(a.cookieName)||a.cookieWrite(a.cookieName,"T",1)))a.G=j;return a.G};a.a=i;a.c=i;var v=a.W;v||(v="MC");var l=a.Y;l||
(l="MCMID");var w=a.X;w||(w="MCCIDH");var t=a.U;t||(t="A");var m=a.R;m||(m="MCAID");var u=a.V;u||(u="AAM");var q=a.T;q||(q="MCAAMLH");var n=a.S;n||(n="MCAAMB");var r=a.Z;r||(r="NONE");a.u=0;a.C=function(){if(!a.u){var d=a.version;a.customerIDMappingServer&&(d+="|"+a.customerIDMappingServer);a.customerIDMappingServerSecure&&(d+="|"+a.customerIDMappingServerSecure);a.audienceManagerServer&&(d+="|"+a.audienceManagerServer);a.audienceManagerServerSecure&&(d+="|"+a.audienceManagerServerSecure);if(a.audienceManagerCustomerIDDPIDs)for(var c in a.audienceManagerCustomerIDDPIDs)!Object.prototype[c]&&
a.audienceManagerCustomerIDDPIDs[c]&&(d+=c+"="+a.audienceManagerCustomerIDDPIDs[c]);a.u=a.D(d)}return a.u};a.H=p;a.j=function(){if(!a.H){a.H=j;var d=a.C(),c=p,b=a.cookieRead(a.cookieName),e,f,g,h=new Date;a.a==i&&(a.a={});if(b&&"T"!=b){b=b.split("|");b[0].match(/^[\-0-9]+$/)&&(parseInt(b[0])!=d&&(c=j),b.shift());1==b.length%2&&b.pop();for(d=0;d<b.length;d+=2)e=b[d].split("-"),f=e[0],g=b[d+1],e=1<e.length?parseInt(e[1]):0,c&&(f==w&&(g=""),0<e&&(e=h.getTime()/1E3-60)),f&&g&&(a.g(f,g,1),0<e&&(a.a["expire"+
f]=e,h.getTime()>=1E3*e&&(a.c||(a.c={}),a.c[f]=j)))}if(!a.b(m)&&(b=a.cookieRead("s_vi")))b=b.split("|"),1<b.length&&0<=b[0].indexOf("v1")&&(g=b[1],d=g.indexOf("["),0<=d&&(g=g.substring(0,d)),g&&g.match(/^[0-9a-fA-F\-]+$/)&&a.g(m,g))}};a.N=function(){var d=a.C(),c,b;for(c in a.a)!Object.prototype[c]&&a.a[c]&&"expire"!=c.substring(0,6)&&(b=a.a[c],d+=(d?"|":"")+c+(a.a["expire"+c]?"-"+a.a["expire"+c]:"")+"|"+b);a.cookieWrite(a.cookieName,d,1)};a.b=function(d,c){return a.a!=i&&(c||!a.c||!a.c[d])?a.a[d]:
i};a.g=function(d,c,b){a.a==i&&(a.a={});a.a[d]=c;b||a.N()};a.t=function(d,c){var b=new Date;b.setTime(b.getTime()+1E3*c);a.a==i&&(a.a={});a.a["expire"+d]=Math.floor(b.getTime()/1E3);0>c&&(a.c||(a.c={}),a.c[d]=j)};a.B=function(a){if(a&&("object"==typeof a&&(a=a.d_mid?a.d_mid:a.visitorID?a.visitorID:a.id?a.id:a.uuid?a.uuid:""+a),a&&(a=a.toUpperCase(),"NOTARGET"==a&&(a=r)),!a||a!=r&&!a.match(/^[0-9a-fA-F\-]+$/)))a="";return a};a.i=function(d,c){a.I(d);a.f!=i&&(a.f[d]=p);if(d==v){var b=a.b(l);if(!b){b=
"object"==typeof c&&c.mid?c.mid:a.B(c);if(!b){if(a.q){a.getAnalyticsVisitorID(null,!1,!0);return}b=a.n()}a.g(l,b)}if(!b||b==r)b="";"object"==typeof c&&((c.d_region||c.dcs_region||c.d_blob||c.blob)&&a.i(u,c),a.q&&c.mid&&a.i(t,{id:c.id}));a.l(l,[b])}if(d==u&&"object"==typeof c){b=604800;void 0!=c.id_sync_ttl&&c.id_sync_ttl&&(b=parseInt(c.id_sync_ttl));var e=a.b(q);e||((e=c.d_region)||(e=c.dcs_region),e&&(a.t(q,b),a.g(q,e)));e||(e="");a.l(q,[e]);e=a.b(n);if(c.d_blob||c.blob)(e=c.d_blob)||(e=c.blob),
a.t(n,b),a.g(n,e);e||(e="");a.l(n,[e])}if(d==t){b=a.b(m);b||((b=a.B(c))||(b=r),a.g(m,b));if(!b||b==r)b="";a.l(m,[b])}};a.f=i;a.o=function(d,c,b,e){var f="",g;if(a.isAllowed()&&(a.j(),f=a.b(d),!f&&(d==l?g=v:d==q||d==n?g=u:d==m&&(g=t),g))){if(a.f==i||!a.f[g])a.f==i&&(a.f={}),a.f[g]=j,a.K(g,c,function(){if(!a.b(d)){var b="";d==l&&(b=a.n());a.i(g,b)}});a.M(d,b);return""}if((d==l||d==m)&&f==r)f="",e=j;b&&e&&a.z(b,[f]);return f};a._setMarketingCloudFields=function(d){a.j();a.i(v,d)};a.setMarketingCloudVisitorID=
function(d){a._setMarketingCloudFields(d)};a.q=p;a.getMarketingCloudVisitorID=function(d,c){return a.isAllowed()?(a.marketingCloudServer&&0>a.marketingCloudServer.indexOf(".demdex.net")&&(a.q=j),a.o(l,a.r("_setMarketingCloudFields"),d,c)):""};a._mapCustomerIDsDone=function(d){d&&"success"==d.status&&a.g(w,a.s)};a.L=function(){a._mapCustomerIDsDone({status:"success"})};a.e={};a.A=p;a.s="";a.setCustomerIDs=function(d){a.e=d;if(a.isAllowed()){a.j();var d=a.b(w),c="",b,e;d||(d=0);for(b in a.e)e=a.e[b],
!Object.prototype[b]&&e&&(c+=(c?"|":"")+b+"|"+e);a.s=a.D(c);a.s!=d&&(a.A=j,a.L())}};a.getCustomerIDs=function(){return a.e};a._setAnalyticsFields=function(d){a.j();a.i(t,d)};a.setAnalyticsVisitorID=function(d){a._setAnalyticsFields(d)};a.getAnalyticsVisitorID=function(d,c,b){if(a.isAllowed()){var e="";b||(e=a.getMarketingCloudVisitorID(function(){a.getAnalyticsVisitorID(d,j)}));if(e||b){var f=b?a.marketingCloudServer:a.trackingServer,g="";a.loadSSL&&(b?a.marketingCloudServerSecure&&(f=a.marketingCloudServerSecure):
a.trackingServerSecure&&(f=a.trackingServerSecure));f&&(g="http"+(a.loadSSL?"s":"")+"://"+f+"/id?callback=s_c_il%5B"+a._in+"%5D._set"+(b?"MarketingCloud":"Analytics")+"Fields&mcorgid="+encodeURIComponent(a.marketingCloudOrgID)+(e?"&mid="+e:""));return a.o(b?l:m,g,d,c)}}return""};a._setAudienceManagerFields=function(d){a.j();a.i(u,d)};a.r=function(d){var c=a.audienceManagerServer,b="",e=a.b(l),f=a.b(n,j),g="",h,i;a.loadSSL&&a.audienceManagerServerSecure&&(c=a.audienceManagerServerSecure);if(c){if(a.e&&
a.audienceManagerCustomerIDDPIDs)for(h in a.e)Object.prototype[h]||(b=a.e[h],i=a.audienceManagerCustomerIDDPIDs[h],b&&i&&(g+=(g?"%01":"&d_cid=")+i+"%01"+encodeURIComponent(b)));d||(d="_setAudienceManagerFields");b="http"+(a.loadSSL?"s":"")+"://"+c+"/id?d_rtbd=json&d_ver=2"+(!e&&a.q?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(a.marketingCloudOrgID)+(e?"&d_mid="+e:"")+(f?"&d_blob="+encodeURIComponent(f):"")+g+"&d_cb=s_c_il%5B"+a._in+"%5D."+d}return b};a.getAudienceManagerLocationHint=function(d,
c){return a.isAllowed()&&a.getMarketingCloudVisitorID(function(){a.getAudienceManagerLocationHint(d,j)})?a.o(q,a.r(),d,c):""};a.getAudienceManagerBlob=function(d,c){if(a.isAllowed()&&a.getMarketingCloudVisitorID(function(){a.getAudienceManagerBlob(d,j)})){var b=a.r();a.A&&a.t(n,-1);return a.o(n,b,d,c)}return""};a.k="";a.p={};a.v="";a.w={};a.getSupplementalDataID=function(d,c){!a.k&&!c&&(a.k=a.n(1));var b=a.k;a.v&&!a.w[d]?(b=a.v,a.w[d]=j):b&&(a.p[d]&&(a.v=a.k,a.w=a.p,a.k=b=!c?a.n(1):"",a.p={}),b&&
(a.p[d]=j));return b};0>k.indexOf("@")&&(k+="@AdobeOrg");a.marketingCloudOrgID=k;a.namespace=s;a.cookieName="AMCV_"+k;a.m=a.J();a.m==h.location.hostname&&(a.m="");if(s){var x="AMCV_"+s,z=a.cookieRead(a.cookieName),y=a.cookieRead(x);!z&&y&&(a.cookieWrite(a.cookieName,y,1),a.cookieWrite(x,"",-60))}a.loadSSL=0<=h.location.protocol.toLowerCase().indexOf("https");a.loadTimeout=500;a.marketingCloudServer=a.audienceManagerServer="dpm.demdex.net";a.customerIDMappingServer="map.adobecrs.com"}
Visitor.getInstance=function(k,s){var a,h=window.s_c_il,o;0>k.indexOf("@")&&(k+="@AdobeOrg");if(h)for(o=0;o<h.length;o++)if((a=h[o])&&"Visitor"==a._c&&(a.marketingCloudOrgID==k||s&&a.namespace==s))return a;return new Visitor(k,s)};
