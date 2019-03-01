(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admin-scout"],{"006e":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("p",[t._v("\n    This is a list of all scouts that have ever been registered for MBU Online.\n  ")]),t.error||t.eventLoadError?s("closable-error"):t._e(),t.loading||t.eventLoading?s("spinner-page"):s("div",[s("filter-box",{staticClass:"scout-list-filters",attrs:{troop:t.troopFilter,eventId:t.eventsFilter,search:t.search,troops:t.troops},on:{"update:troop":function(e){t.troopFilter=e},"update:eventId":function(e){t.eventsFilter=e},"update:event-id":function(e){t.eventsFilter=e},"update:search":function(e){t.search=e}}}),t.filteredScouts.length>0?s("div",[s("scout-table",{attrs:{scouts:t.filteredScouts}})],1):s("div",{staticClass:"notification"},[s("p",[t._v("\n        There are no scouts that match the criteria you specified.\n      ")])]),s("router-view")],1)],1)},n=[],o=(s("386d"),s("bc3a")),a=s.n(o),i=s("2ef0"),l=s.n(i),c=s("3fab"),u=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("paginated-items",{attrs:{target:"scouts",contents:t.orderedScouts,showLinks:!0,table:!0},scopedSlots:t._u([{key:"row",fn:function(t){return[s("scout-row",{attrs:{id:t.item.scout_id,firstname:t.item.firstname,lastname:t.item.lastname,troop:t.item.troop,registration:t.item.registrations,user:t.item.user}})]}}])},[s("thead",{attrs:{slot:"heading"},slot:"heading"},[s("tr",[s("th",{staticClass:"sortable",class:{"sorted-column":"firstname"===t.order},on:{click:function(e){return t.sort("firstname")}}},[t._v("\n        First Name\n        "),"firstname"===t.order?s("span",{staticClass:"icon is-small"},[t.sortAscending?s("span",{staticClass:"fa fa-sort-alpha-asc"}):s("span",{staticClass:"fa fa-sort-alpha-desc"})]):t._e()]),s("th",{staticClass:"sortable",class:{"sorted-column":"lastname"===t.order},on:{click:function(e){return t.sort("lastname")}}},[t._v("\n        Last Name\n        "),"lastname"===t.order?s("span",{staticClass:"icon is-small"},[t.sortAscending?s("span",{staticClass:"fa fa-sort-alpha-asc"}):s("span",{staticClass:"fa fa-sort-alpha-desc"})]):t._e()]),s("th",{staticClass:"sortable",class:{"sorted-column":"troop"===t.order},on:{click:function(e){return t.sort("troop")}}},[t._v("\n        Troop\n        "),"troop"===t.order?s("span",{staticClass:"icon is-small"},[t.sortAscending?s("span",{staticClass:"fa fa-sort-numeric-asc"}):s("span",{staticClass:"fa fa-sort-numeric-desc"})]):t._e()]),s("th",[t._v("Coordinator")]),s("th",{attrs:{colspan:"1"}})])])])},d=[],p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",[s("td",[t._v(t._s(t.firstname))]),s("td",[t._v(t._s(t.lastname))]),s("td",[t._v(t._s(t.troop))]),s("td",[t._v(t._s(t.user.fullname))]),s("td",[s("span",{staticClass:"is-pulled-right"},[s("router-link",{attrs:{to:"/administration/scouts/list/"+t.id}},[t._v("Details")])],1)])])},f=[],h=(s("c5f6"),{props:{id:{type:Number,required:!0},firstname:{type:String,required:!0},lastname:{type:String,required:!0},troop:{type:Number,required:!0},registrations:{type:Array,default:function(){return[]}},user:{type:Object,required:!0}}}),v=h,m=s("2877"),g=Object(m["a"])(v,p,f,!1,null,null,null),b=g.exports,_={props:{scouts:{type:Array,required:!0}},data:function(){return{order:"troop",sortAscending:!0}},computed:{orderedScouts:function(){var t=this.sortAscending?"asc":"desc";return l.a.orderBy(this.scouts,this.order,t)}},methods:{sort:function(t){t===this.order?this.sortAscending=!this.sortAscending:(this.order=t,this.sortAscending=!0)}},components:{ScoutRow:b}},C=_,y=Object(m["a"])(C,u,d,!1,null,"aa0591ea",null),P=y.exports,x=s("a1f2"),w=s("7c19"),F={data:function(){return{error:"",eventsFilter:null,loading:!1,scouts:[],search:"",troopFilter:null}},computed:{filteredScouts:function(){var t=this,e=this.scouts;return this.troopFilter&&(e=l.a.filter(e,function(e){return e.troop===t.troopFilter})),this.eventsFilter&&(e=l.a.filter(e,function(e){return l.a.some(e.registrations,{event_id:t.eventsFilter})})),l.a.filter(e,function(e){return e.fullname.toLowerCase().indexOf(t.search.toLowerCase())>-1})},troops:function(){return this.scouts?l.a.orderBy(l.a.uniq(l.a.map(this.scouts,"troop"))):[]}},methods:{dismissError:function(){this.error=""}},created:function(){var t=this;this.loading=!0,a.a.get(c["a"].SCOUTS_URL).then(function(e){t.scouts=e.data,t.error=""}).catch(function(){t.error="Failed to retrieve scouts. Please refresh and try again."}).then(function(){t.loading=!1})},components:{FilterBox:x["a"],ScoutTable:P},mixins:[w["a"]]},S=F,I=(s("ba39"),Object(m["a"])(S,r,n,!1,null,"5e40f636",null));e["default"]=I.exports},"2fdb":function(t,e,s){"use strict";var r=s("5ca1"),n=s("d2c8"),o="includes";r(r.P+r.F*s("5147")(o),"String",{includes:function(t){return!!~n(this,t,o).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"386d":function(t,e,s){"use strict";var r=s("cb7c"),n=s("83a1"),o=s("5f1b");s("214f")("search",1,function(t,e,s,a){return[function(s){var r=t(this),n=void 0==s?void 0:s[e];return void 0!==n?n.call(s,r):new RegExp(s)[e](String(r))},function(t){var e=a(s,t,this);if(e.done)return e.value;var i=r(t),l=String(this),c=i.lastIndex;n(c,0)||(i.lastIndex=0);var u=o(i,l);return n(i.lastIndex,c)||(i.lastIndex=c),null===u?-1:u.index}]})},5147:function(t,e,s){var r=s("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(s){try{return e[r]=!1,!"/./"[t](e)}catch(n){}}return!0}},"5a09":function(t,e,s){},6762:function(t,e,s){"use strict";var r=s("5ca1"),n=s("c366")(!0);r(r.P,"Array",{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),s("9c6c")("includes")},"7c19":function(t,e,s){"use strict";var r=s("795b"),n=s.n(r);s("ac6a"),s("5df3");e["a"]={data:function(){return{eventLoading:!1,eventLoadError:""}},created:function(){var t=this;this.eventLoading=!0,n.a.all([this.$store.dispatch("getEvents"),this.$store.dispatch("getCurrentEvent")]).then(function(){t.eventLoadError=""}).catch(function(){t.eventLoadError="Failed to fetch event data. Please refresh to try again."}).then(function(){t.eventLoading=!1})}}},"83a1":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},a1f2:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"box filters"},[s("div",{staticClass:"columns is-multiline"},[s("div",{staticClass:"column is-6"},[s("horizontal-field",[s("span",{attrs:{slot:"field-label"},slot:"field-label"},[t._v("Registered:")]),s("events-dropdown",{attrs:{slot:"field-contents"},on:{select:function(e){t.updateQuery("eventId",Number(e))}},slot:"field-contents"})],1)],1),s("div",{staticClass:"column is-6"},[s("horizontal-field",[s("span",{attrs:{slot:"field-label"},slot:"field-label"},[t._v("Troop:")]),s("span",{staticClass:"input-group select",attrs:{slot:"field-contents"},slot:"field-contents"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.troopProp,expression:"troopProp"}],staticClass:"input",on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.troopProp=e.target.multiple?s:s[0]},function(e){t.updateQuery("troop",e.target.value?Number(e.target.value):null)}]}},[s("option",{domProps:{value:null}},[t._v("All Troops")]),t._l(t.troops,function(e){return s("option",{key:e,domProps:{value:e}},[t._v("\n              "+t._s(e)+"\n            ")])})],2)])])],1),s("div",{staticClass:"column is-6"},[s("horizontal-field",[s("span",{attrs:{slot:"field-label"},slot:"field-label"},[t._v("Name:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.searchProp,expression:"searchProp"}],staticClass:"input is-expanded",attrs:{slot:"field-contents",id:"scout-list-find"},domProps:{value:t.searchProp},on:{input:[function(e){e.target.composing||(t.searchProp=e.target.value)},function(e){return t.updateQuery("search",e.target.value)}]},slot:"field-contents"})])],1),s("div",{staticClass:"column is-6"},[s("div",{staticClass:"field is-grouped"},[s("div",{staticClass:"control is-pulled-right"},[s("button",{staticClass:"button is-pulled-right",on:{click:function(e){return e.preventDefault(),t.reset()}}},[t._v("Reset Filters")])])])])])])},n=[],o=(s("6762"),s("2fdb"),s("a481"),s("386d"),s("c5f6"),s("2ef0")),a=s.n(o),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"field is-horizontal"},[s("div",{staticClass:"field-label is-normal"},[s("label",{staticClass:"label"},[t._t("field-label")],2)]),s("div",{staticClass:"field-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[t._t("field-contents")],2)])])])},l=[],c=s("2877"),u={},d=Object(c["a"])(u,i,l,!1,null,null,null),p=d.exports,f={props:{eventId:Number,troop:Number,search:String,troops:Array},data:function(){return{eventIdProp:this.eventId,troopProp:this.troop,searchProp:this.search}},methods:{reset:function(){this.troopProp=null,this.searchProp=null,this.updateQuery("troop",null),this.updateQuery("search","")},sendUpdate:function(t,e){this.$emit("update:"+t,e)},updateQuery:function(t,e){var s=a.a.clone(this.$route.query);null===e?delete s[t]:s[t]=e,this.$router.replace({query:s}),this.sendUpdate(t,e)}},watch:{troopProp:function(t,e){void 0===t&&(this.troopProp=e)},troops:function(){a.a.includes(this.troops,this.troopProp)||(this.troopProp=null,this.updateQuery("troop",null))}},mounted:function(){var t=this.$route.query;t.troop&&(this.troopProp=t.troop,this.sendUpdate("troop",Number(t.troop))),t.eventId&&(this.eventIdProp=t.eventId,this.sendUpdate("eventId",Number(t.eventId))),t.search&&(this.searchProp=t.search,this.sendUpdate("search",t.search))},components:{HorizontalField:p}},h=f,v=Object(c["a"])(h,r,n,!1,null,null,null);e["a"]=v.exports},ba39:function(t,e,s){"use strict";var r=s("5a09"),n=s.n(r);n.a},d2c8:function(t,e,s){var r=s("aae3"),n=s("be13");t.exports=function(t,e,s){if(r(e))throw TypeError("String#"+s+" doesn't accept regex!");return String(n(t))}}}]);
//# sourceMappingURL=admin-scout.072dd8e3.js.map