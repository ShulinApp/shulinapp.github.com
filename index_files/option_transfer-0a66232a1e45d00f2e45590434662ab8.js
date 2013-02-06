// ===================================================================
// Author: Matt Kruse <matt@mattkruse.com>
// WWW: http://www.mattkruse.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however it is
// appreciated by the author if at least my web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download. 
// If you wish to share this code with others, please just point them
// to the URL instead.
// Please DO NOT link directly to my .js files from your site. Copy
// the files to your server and use them there. Thank you.
// ===================================================================
/* SOURCE FILE: selectbox.js */
// HISTORY
// ------------------------------------------------------------------
// June 12, 2003: Modified up and down functions to support more than
//                one selected option
/*
DESCRIPTION: These are general functions to deal with and manipulate
select boxes. Also see the OptionTransfer library to more easily 
handle transferring options between two lists

COMPATABILITY: These are fairly basic functions - they should work on
all browsers that support Javascript.
*/
// -------------------------------------------------------------------
// hasOptions(obj)
//  Utility function to determine if a select object has an options array
// -------------------------------------------------------------------
function hasOptions(a){return a!=null&&a.options!=null?!0:!1}function selectUnselectMatchingOptions(a,b,c,d){if(window.RegExp){if(c=="select")var e=!0,f=!1;else{if(c!="unselect")return;var e=!1,f=!0}var g=new RegExp(b);if(!hasOptions(a))return;for(var h=0;h<a.options.length;h++)g.test(a.options[h].text)?a.options[h].selected=e:d==1&&(a.options[h].selected=f)}}function selectMatchingOptions(a,b){selectUnselectMatchingOptions(a,b,"select",!1)}function selectOnlyMatchingOptions(a,b){selectUnselectMatchingOptions(a,b,"select",!0)}function unSelectMatchingOptions(a,b){selectUnselectMatchingOptions(a,b,"unselect",!1)}function sortSelect(a){var b=new Array;if(!hasOptions(a))return;for(var c=0;c<a.options.length;c++)b[b.length]=new Option(a.options[c].text,a.options[c].value,a.options[c].defaultSelected,a.options[c].selected);if(b.length==0)return;b=b.sort(function(a,b){return a.text+""<b.text+""?-1:a.text+"">b.text+""?1:0});for(var c=0;c<b.length;c++)a.options[c]=new Option(b[c].text,b[c].value,b[c].defaultSelected,b[c].selected)}function selectAllOptions(a){if(!hasOptions(a))return;for(var b=0;b<a.options.length;b++)a.options[b].selected=!0}function moveSelectedOptions(a,b){if(arguments.length>3){var c=arguments[3];c!=""&&unSelectMatchingOptions(a,c)}if(!hasOptions(a))return;for(var d=0;d<a.options.length;d++){var e=a.options[d];if(e.selected){if(!hasOptions(b))var f=0;else var f=b.options.length;b.options[f]=new Option(e.text,e.value,!1,!1)}}for(var d=a.options.length-1;d>=0;d--){var e=a.options[d];e.selected&&(a.options[d]=null)}if(arguments.length<3||arguments[2]==1)sortSelect(a),sortSelect(b);a.selectedIndex=-1,b.selectedIndex=-1}function copySelectedOptions(a,b){var c=new Object;if(hasOptions(b))for(var d=0;d<b.options.length;d++)c[b.options[d].value]=b.options[d].text;if(!hasOptions(a))return;for(var d=0;d<a.options.length;d++){var e=a.options[d];if(e.selected)if(c[e.value]==null||c[e.value]=="undefined"||c[e.value]!=e.text){if(!hasOptions(b))var f=0;else var f=b.options.length;b.options[f]=new Option(e.text,e.value,!1,!1)}}(arguments.length<3||arguments[2]==1)&&sortSelect(b),a.selectedIndex=-1,b.selectedIndex=-1}function moveAllOptions(a,b){selectAllOptions(a),arguments.length==2?moveSelectedOptions(a,b):arguments.length==3?moveSelectedOptions(a,b,arguments[2]):arguments.length==4&&moveSelectedOptions(a,b,arguments[2],arguments[3])}function copyAllOptions(a,b){selectAllOptions(a),arguments.length==2?copySelectedOptions(a,b):arguments.length==3&&copySelectedOptions(a,b,arguments[2])}function swapOptions(a,b,c){var d=a.options,e=d[b].selected,f=d[c].selected,g=new Option(d[b].text,d[b].value,d[b].defaultSelected,d[b].selected),h=new Option(d[c].text,d[c].value,d[c].defaultSelected,d[c].selected);d[b]=h,d[c]=g,d[b].selected=f,d[c].selected=e}function moveOptionUp(a){if(!hasOptions(a))return;for(i=0;i<a.options.length;i++)a.options[i].selected&&i!=0&&!a.options[i-1].selected&&(swapOptions(a,i,i-1),a.options[i-1].selected=!0)}function moveOptionDown(a){if(!hasOptions(a))return;for(i=a.options.length-1;i>=0;i--)a.options[i].selected&&i!=a.options.length-1&&!a.options[i+1].selected&&(swapOptions(a,i,i+1),a.options[i+1].selected=!0)}function removeSelectedOptions(a){if(!hasOptions(a))return;for(var b=a.options.length-1;b>=0;b--){var c=a.options[b];c.selected&&(a.options[b]=null)}a.selectedIndex=-1}function removeAllOptions(a){if(!hasOptions(a))return;for(var b=a.options.length-1;b>=0;b--)a.options[b]=null;a.selectedIndex=-1}function addOption(a,b,c,d){a!=null&&a.options!=null&&(a.options[a.options.length]=new Option(b,c,!1,d))}function OT_transferLeft(){moveSelectedOptions(this.right,this.left,this.autoSort,this.staticOptionRegex),this.update()}function OT_transferRight(){moveSelectedOptions(this.left,this.right,this.autoSort,this.staticOptionRegex),this.update()}function OT_transferAllLeft(){moveAllOptions(this.right,this.left,this.autoSort,this.staticOptionRegex),this.update()}function OT_transferAllRight(){moveAllOptions(this.left,this.right,this.autoSort,this.staticOptionRegex),this.update()}function OT_saveRemovedLeftOptions(a){this.removedLeftField=a}function OT_saveRemovedRightOptions(a){this.removedRightField=a}function OT_saveAddedLeftOptions(a){this.addedLeftField=a}function OT_saveAddedRightOptions(a){this.addedRightField=a}function OT_saveNewLeftOptions(a){this.newLeftField=a}function OT_saveNewRightOptions(a){this.newRightField=a}function OT_update(){var a=new Object,b=new Object,c=new Object,d=new Object,e=new Object,f=new Object;for(var g=0;g<this.left.options.length;g++){var h=this.left.options[g];e[h.value]=1,typeof this.originalLeftValues[h.value]=="undefined"&&(c[h.value]=1,b[h.value]=1)}for(var g=0;g<this.right.options.length;g++){var h=this.right.options[g];f[h.value]=1,typeof this.originalRightValues[h.value]=="undefined"&&(d[h.value]=1,a[h.value]=1)}this.removedLeftField!=null&&(this.removedLeftField.value=OT_join(a,this.delimiter)),this.removedRightField!=null&&(this.removedRightField.value=OT_join(b,this.delimiter)),this.addedLeftField!=null&&(this.addedLeftField.value=OT_join(c,this.delimiter)),this.addedRightField!=null&&(this.addedRightField.value=OT_join(d,this.delimiter)),this.newLeftField!=null&&(this.newLeftField.value=OT_join(e,this.delimiter)),this.newRightField!=null&&(this.newRightField.value=OT_join(f,this.delimiter))}function OT_join(a,b){var c,d="";for(c in a)d.length>0&&(d+=b),d+=c;return d}function OT_setDelimiter(a){this.delimiter=a}function OT_setAutoSort(a){this.autoSort=a}function OT_setStaticOptionRegex(a){this.staticOptionRegex=a}function OT_init(a){this.form=a;if(!a[this.left])return alert("OptionTransfer init(): Left select list does not exist in form!"),!1;if(!a[this.right])return alert("OptionTransfer init(): Right select list does not exist in form!"),!1;this.left=a[this.left],this.right=a[this.right];for(var b=0;b<this.left.options.length;b++)this.originalLeftValues[this.left.options[b].value]=1;for(var b=0;b<this.right.options.length;b++)this.originalRightValues[this.right.options[b].value]=1;this.removedLeftField!=null&&(this.removedLeftField=a[this.removedLeftField]),this.removedRightField!=null&&(this.removedRightField=a[this.removedRightField]),this.addedLeftField!=null&&(this.addedLeftField=a[this.addedLeftField]),this.addedRightField!=null&&(this.addedRightField=a[this.addedRightField]),this.newLeftField!=null&&(this.newLeftField=a[this.newLeftField]),this.newRightField!=null&&(this.newRightField=a[this.newRightField]),this.update()}function OptionTransfer(a,b){this.form=null,this.left=a,this.right=b,this.autoSort=!0,this.delimiter=",",this.staticOptionRegex="",this.originalLeftValues=new Object,this.originalRightValues=new Object,this.removedLeftField=null,this.removedRightField=null,this.addedLeftField=null,this.addedRightField=null,this.newLeftField=null,this.newRightField=null,this.transferLeft=OT_transferLeft,this.transferRight=OT_transferRight,this.transferAllLeft=OT_transferAllLeft,this.transferAllRight=OT_transferAllRight,this.saveRemovedLeftOptions=OT_saveRemovedLeftOptions,this.saveRemovedRightOptions=OT_saveRemovedRightOptions,this.saveAddedLeftOptions=OT_saveAddedLeftOptions,this.saveAddedRightOptions=OT_saveAddedRightOptions,this.saveNewLeftOptions=OT_saveNewLeftOptions,this.saveNewRightOptions=OT_saveNewRightOptions,this.setDelimiter=OT_setDelimiter,this.setAutoSort=OT_setAutoSort,this.setStaticOptionRegex=OT_setStaticOptionRegex,this.init=OT_init,this.update=OT_update};