(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["classes"],{"05e4":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.isList?n("h4",{staticClass:"title is-4"},[t._v("All Classes")]):n("h4",{staticClass:"title is-4"},[n("router-link",{attrs:{to:"../all"}},[t._v("\n      All Classes\n    ")]),t._v("\n    / "+t._s(t.title)+"\n  ")],1),t.eventLoadError?n("closable-error"):t._e(),t.eventLoading?n("spinner-page"):n("router-view",{on:{title:function(e){t.setTitle(e)}}})],1)},i=[],r=n("7c19"),o=/.*all\/?$/,a={data:function(){return{title:"Class Details"}},computed:{isList:function(){return o.test(this.$route.path)}},methods:{setTitle:function(t){this.title=t}},mixins:[r["a"]]},c=a,l=n("2877"),d=Object(l["a"])(c,s,i,!1,null,null,null);d.options.__file="ClassContainer.vue";e["default"]=d.exports},2326:function(t,e,n){"use strict";var s=n("a3eb"),i=n.n(s);i.a},"25cf":function(t,e,n){"use strict";n("7514");var s=n("c93e"),i=n("2ef0"),r=n.n(i),o=n("2f62");e["a"]={data:function(){return{classesLoading:!1,classLoadError:""}},computed:Object(s["a"])({},Object(o["b"])(["eventClasses"])),methods:{sizeInfoForOffering:function(t,e){var n=this.classesForEvent(t),s=r.a.find(n,{offering_id:e})||{};return s.sizeInfo},classesForEvent:function(t){return this.eventClasses[t]||[]},hasClassInfoForEvent:function(t){var e=this.classesForEvent(t);return e&&e.length>0&&e[0].sizeInfo},loadClasses:function(t){var e=this;this.classesLoading=!0,this.$store.dispatch("getClasses",t).then(function(n){return e.getSizesForBadges(t,r.a.map(n,"badge.badge_id"))}).then(function(){e.classLoadError=""}).catch(function(){e.classLoadError="Failed to get classes for this event"}).then(function(){e.classesLoading=!1})},getSizesForBadges:function(t,e){var n=this;return new Promise(function(s,i){n.$store.dispatch("getClassSizes",{eventId:t,badgeIds:e}).then(function(){return s()}).catch(function(){return i()})})}}}},2864:function(t,e,n){},"386d":function(t,e,n){n("214f")("search",1,function(t,e,n){return[function(n){"use strict";var s=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,s):new RegExp(n)[e](String(s))},n]})},7073:function(t,e,n){"use strict";var s=n("2864"),i=n.n(s);i.a},"7c19":function(t,e,n){"use strict";n("ac6a");e["a"]={data:function(){return{eventLoading:!1,eventLoadError:""}},created:function(){var t=this;this.eventLoading=!0,Promise.all([this.$store.dispatch("getEvents"),this.$store.dispatch("getCurrentEvent")]).then(function(){t.eventLoadError=""}).catch(function(){t.eventLoadError="Failed to fetch event data. Please refresh to try again."}).then(function(){t.eventLoading=!1})}}},"845e":function(t,e,n){},"95b5":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v('\n    This page shows the number of scouts assigned to each class. You can view the completion records for\n    each scout in a class by clicking the "details" link next to each class.\n    '),t.isAdmin?n("span",[t._v(" To edit badges that are offered for an event, use the\n      "),n("router-link",{attrs:{to:"/administration/events/offerings"}},[t._v("offerings page")]),t._v(". To change a scout's badge assignments, use the\n      "),n("router-link",{attrs:{to:"/administration/scouts/assignments"}},[t._v("assignments page")]),t._v(".\n    ")],1):t._e()]),n("div",{staticClass:"box class-list-filters"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-6"},[n("div",{staticClass:"field is-horizontal"},[t._m(0),n("div",{staticClass:"field-body"},[n("div",{staticClass:"field"},[n("div",{staticClass:"control"},[n("events-dropdown",{on:{select:function(e){t.setEvent(e)}}})],1)])])])]),n("div",{staticClass:"column is-6"},[n("div",{staticClass:"search-container field is-horizontal"},[t._m(1),n("div",{staticClass:"field-body"},[n("div",{staticClass:"field"},[n("div",{staticClass:"control "},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"input is-expanded",attrs:{id:"class-list-find"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}})])])])])])])]),t.classLoadError?n("closable-error",{on:{dismissed:function(e){t.dismissError()}}},[t._v(t._s(t.classLoadError))]):t._e(),t.classesLoading?n("spinner-page"):n("table",{staticClass:"table is-striped is-fullwidth"},[n("thead",[n("tr",{staticClass:"meta-header"},[n("th",{attrs:{colspan:"3"}},[t._v("Class Information")]),n("th",{attrs:{colspan:"4"}},[t._v("Attendance per Period")]),n("th")]),n("tr",[n("th",[t._v("Badge")]),n("th",[t._v("Duration")]),n("th",[t._v("Limit/Period")]),n("th",[t._v("Total")]),n("th",[t._v("1")]),n("th",[t._v("2")]),n("th",[t._v("3")]),n("th")])]),n("tbody",t._l(t.filteredOrderedClasses,function(e){return n("attendance-row",{key:e.offering_id,attrs:{id:e.offering_id,"event-id":t.eventId,badge:e.badge.name,"size-info":e.sizeInfo||{},duration:e.duration,"offered-periods":e.periods}})}))])],1)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"field-label is-normal"},[n("label",{staticClass:"label"},[t._v("For Event:")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"field-label is-normal"},[n("label",{staticClass:"label",attrs:{for:"class-list-find"}},[t._v("Badge:")])])}],r=(n("386d"),n("7f7f"),n("7514"),n("c93e")),o=n("2f62"),a=n("2ef0"),c=n.n(a),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("td",[t._v(t._s(t.badge))]),n("td",[t._v(t._s(t.duration))]),n("td",[t._v(t._s(t.sizeInfo.size_limit))]),n("td",[t._v(t._s(t.sizeInfo.total))]),t._l(3,function(e){return n("td",{key:e},[n("span",{class:{"is-light":!t.offeredForPeriod(e)}},[t._v("\n      "+t._s(t.sizeInfo[e])+"\n    ")])])}),n("td",[n("router-link",{attrs:{to:t.eventId+"/"+t.id}},[t._v("\n      Details\n    ")])],1)],2)},d=[],u=(n("c5f6"),{props:{id:{type:Number,required:!0},eventId:{type:Number,required:!0},badge:{type:String,required:!0},duration:{type:Number,required:!0},sizeInfo:{type:Object,required:!0},offeredPeriods:{type:Array,required:!0}},methods:{offeredForPeriod:function(t){return this.offeredPeriods.indexOf(t)>-1}}}),f=u,v=(n("b8b4"),n("2877")),h=Object(v["a"])(f,l,d,!1,null,"3398853e",null);h.options.__file="AttendanceRow.vue";var p=h.exports,m=n("25cf"),g={data:function(){return{eventId:0,search:""}},computed:Object(r["a"])({},Object(o["b"])(["allEvents","eventClasses","isAdmin"]),{event:function(){return c.a.find(this.allEvents,{id:this.eventId})},classes:function(){return this.eventClasses[this.eventId]||{}},orderedClasses:function(){return c.a.orderBy(this.classes,"badge.name")},filteredOrderedClasses:function(){var t=this;return c.a.filter(this.orderedClasses,function(e){return e.badge.name.toLowerCase().indexOf(t.search.toLowerCase())>-1})}}),methods:{dismissError:function(){this.classLoadError=""},setEvent:function(t){this.eventId=t,this.hasClassInfoForEvent(t)||this.loadClasses(t)}},watch:{eventId:function(){this.dismissError()}},components:{AttendanceRow:p},mixins:[m["a"]]},_=g,b=(n("7073"),Object(v["a"])(_,s,i,!1,null,"719d4c80",null));b.options.__file="ClassList.vue";e["default"]=b.exports},a3eb:function(t,e,n){},b8b4:function(t,e,n){"use strict";var s=n("845e"),i=n.n(s);i.a},bfcb:function(t,e,n){"use strict";var s=n("c1df"),i=n.n(s),r=void 0,o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MM/DD/YYYY";return function(n,s){var o="function"===typeof t?t.call(r,s):s[t],a=i()(o,e),c=i()(n,e);return!a.isValid()||!!c.isValid()&&c.isBefore(i()(o,e))}},a=void 0,c=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"MM/DD/YYYY";return function(s,r){var o="function"===typeof t?t.call(a,r):r[t],c="function"===typeof e?e.call(a,r):r[e],l=i()(o,n),d=i()(c,n),u=i()(s,n);return!l.isValid()||!d.isValid()||!!u.isValid()&&(u.isBetween(l,d)||u.isBetween(d,l))}},l=(n("28a5"),n("2ef0")),d=n.n(l),u=function(t){if("undefined"===typeof t||null===t||""===d.a.trim(t))return!0;var e=d.a.split(t,","),n=/^[0-9A-Za-z]*$/;return d.a.reduce(e,function(t,e){return t&&n.test(d.a.trim(e))},!0)},f=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"MM/DD/YYYY";return function(e){return i()(e,t,!0).isValid()}},v=void 0,h=function(t){return function(e,n){if("undefined"===typeof e||null===e||""===e)return!0;var s="function"===typeof t?t.call(v,n):n[t];return!s||e>=s}},p=void 0,m=function(t){return function(e,n){if("undefined"===typeof e||null===e||""===e)return!0;var s="function"===typeof t?t.call(p,n):n[t];return!s||e<=s}},g=function(t){return"undefined"===typeof t||null===t||""===t||/^[0-9]*$/.test(t)},_=function(t){var e=/\(\d{3}\) ?\d{3}-\d{4}/;return e.test(t)};n.d(e,"a",function(){return o}),n.d(e,"b",function(){return c}),n.d(e,"c",function(){return u}),n.d(e,"d",function(){return f}),n.d(e,"e",function(){return h}),n.d(e,"f",function(){return m}),n.d(e,"g",function(){return g}),n.d(e,"h",function(){return _})},ff0d:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.error?n("closable-error",{on:{dismissed:function(e){t.clearError()}}},[t._v(t._s(t.error))]):t._e(),t.loading?n("spinner-page"):n("div",[t.offering.requirements&&t.offering.requirements.length>0?n("span",[t._v("\n      Requirements are:\n      "),n("b",[t._v(t._s(t._f("commaSeparated")(t._f("numAlphaSort")(t.offering.requirements))))])]):n("span",[t._v("\n      Requirements are not available.\n    ")]),t._l(3,function(e){return n("attendees",{key:e,attrs:{period:e,requirements:t.offering.requirements,offeringId:t.offeringId,eventId:t.eventId,scouts:t.scoutsForPeriod(e)},on:{triggerRefresh:function(e){t.triggerRefresh()}}})})],2)],1)},i=[],r=(n("7f7f"),n("ac6a"),n("7514"),n("c93e")),o=(n("c5f6"),n("2f62")),a=(n("4360"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"attendee-container"},[t.editing?n("div",[n("h5",{staticClass:"title is-5"},[t._v("\n      Editing Completions for Period "+t._s(t.period)+"\n    ")]),t.editing?n("completions-edit",{attrs:{scouts:t.scouts,period:t.period,requirements:t.requirements,offeringId:t.offeringId,eventId:t.eventId},on:{done:function(e){t.toggleEdit()}}}):t._e()],1):n("div",[n("h5",{staticClass:"title is-5"},[t._v("\n      Attendees for Period "+t._s(t.period)+"\n      "),t.scouts.length>0?n("span",[t._v("\n        ("+t._s(t.scouts.length)+")\n      ")]):t._e(),t.scouts.length>0?n("div",{staticClass:"is-pulled-right"},[n("button",{staticClass:"titlebar-button button is-light",on:{click:function(e){t.toggleEdit()}}},[t._v("\n          Edit Completions\n        ")])]):t._e()]),t.scouts.length<1?n("div",{staticClass:"notification"},[t._v("\n      There are no scouts attending this period.\n    ")]):n("table",{staticClass:"table is-striped is-fullwidth"},[t._m(0),n("tbody",t._l(t.scouts,function(e){return n("tr",{key:e.id},[n("td",[t._v(t._s(e.fullname))]),n("td",[t._v(t._s(e.troop))]),n("td",[t._v(t._s(t._f("commaSeparated")(t._f("numAlphaSort")(e.completions))))])])}))])])])}),c=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("Full Name")]),n("th",[t._v("Troop")]),n("th",[t._v("Completed Requirements")])])])}],l=n("2ef0"),d=n.n(l),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("table",{staticClass:"table is-fullwidth"},[t._m(0),t._m(1),n("tbody",t._l(t.scouts,function(e){return n("tr",{key:e.scoutId},[n("td",[t._v(t._s(e.fullname))]),n("td",[t._v(t._s(e.troop))]),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.completions[e.scoutId],expression:"completions[scout.scoutId]"}],staticClass:"input",class:{"is-danger":t.$v.completions.$each[e.scoutId].$invalid},attrs:{id:"completion-scout-"+e.scoutId,disabled:t.saving,"aria-labelledby":"Completions",type:"text",placeholder:"1, 2, 3, ..."},domProps:{value:t.completions[e.scoutId]},on:{blur:function(n){t.$v.completions.$each[e.scoutId].$touch},input:function(n){n.target.composing||t.$set(t.completions,e.scoutId,n.target.value)}}}),t.$v.completions.$each[e.scoutId].$invalid?n("span",{staticClass:"help is-danger"},[t._v("\n            Completions must be a comma separated list of letters and/or numbers.\n          ")]):t._e()])])}))]),n("div",{staticClass:"field is-grouped"},[n("div",{staticClass:"control"},[n("button",{staticClass:"button is-primary",class:{"is-loading":t.saving},attrs:{disabled:t.saving||t.$v.$invalid},on:{click:function(e){e.preventDefault(),t.save()}}},[t._v("Save Completions")])]),n("div",{staticClass:"control"},[n("button",{staticClass:"button",attrs:{disabled:t.saving},on:{click:function(e){e.preventDefault(),t.cancel()}}},[t._v("Cancel")])])])])},f=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("colgroup",[n("col",{staticStyle:{width:"25%"}}),n("col",{staticStyle:{width:"10%"}}),n("col",{staticStyle:{width:"65%"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("Scout")]),n("th",[t._v("Troop")]),n("th",[t._v("Completed Requirements")])])])}],v=(n("28a5"),n("3fab"),n("a026")),h=(n("bc3a"),n("bfcb")),p={props:{period:{type:Number,required:!0},requirements:{type:Array,default:function(){return[]}},scouts:{type:Array,default:function(){return[]}},offeringId:{type:Number,required:!0},eventId:{type:Number,required:!0}},data:function(){return{completions:{},error:"",saving:!1}},methods:{save:function(){var t=this;this.saving=!0,Promise.all(d.a.map(this.completions,function(e,n){var s=d.a.find(t.scouts,["scoutId",Number(n)]),i=d.a.without(d.a.map(d.a.split(e,","),function(t){return String(d.a.trim(t))}),null,0);return t.$store.dispatch("saveCompletions",{scoutId:n,registrationId:s.registrationId,offeringId:t.offeringId,eventId:t.eventId,completions:i})})).then(function(){t.error="",t.$emit("done")}).catch(function(){t.error="Failed to save records. Please refresh and try again."}).then(function(){t.saving=!1})},cancel:function(){this.$emit("done")}},beforeMount:function(){var t=this;d.a.forEach(this.scouts,function(e){v["a"].set(t.completions,e.scoutId,d.a.join(d.a.orderBy(e.completions),", "))})},validations:{completions:{$each:{commaSeparated:h["c"]}}}},m=p,g=n("2877"),b=Object(g["a"])(m,u,f,!1,null,null,null);b.options.__file="CompletionsEdit.vue";var C=b.exports,I={props:{period:{type:Number,required:!0},scouts:{type:Array,default:function(){return[]}},requirements:{type:Array,default:function(){return[]}},offeringId:{type:Number,required:!0},eventId:{type:Number,required:!0}},data:function(){return{editing:!1}},methods:{toggleEdit:function(){this.editing&&this.$emit("triggerRefresh"),this.editing=!this.editing}},components:{CompletionsEdit:C}},y=I,E=(n("2326"),Object(g["a"])(y,a,c,!1,null,"904eb124",null));E.options.__file="Attendees.vue";var $=E.exports,w={props:{offeringId:{type:Number,required:!0},eventId:{type:Number,required:!0}},data:function(){return{assignees:[],loading:!1,badge:"",error:"",offering:{}}},computed:Object(r["a"])({},Object(o["b"])(["allEvents","eventClasses"]),{event:function(){return _.find(this.allEvents,{id:this.eventId})||{}},scoutsByPeriod:function(){var t=_.map(this.assignees,function(t){var e={periods:t.assignment.periods,scout:t.scout};return e.scout.registrationId=t.registration_id,e.scout.scoutId=t.scout_id,e.scout.completions=t.assignment.completions,e});return _.reduce(t,function(t,e){return _.forEach(e.periods,function(n){t[n]?t[n].push(e.scout):t[n]=[e.scout]}),t},[])}}),methods:{clearError:function(){this.error=""},refreshDetails:function(){var t=this,e=this.eventClasses[this.eventId]||{};_.forEach(e,function(e){e.offering_id===t.offeringId&&(t.offering=e,t.assignees=e.assignees,t.badge=e.badge.name)}),this.$emit("title",this.badge+" ("+this.event.semester+" "+this.event.year+")")},scoutsForPeriod:function(t){var e=this.scoutsByPeriod[t]||{};return _.orderBy(e,"lastname")},triggerRefresh:function(){var t=this;this.loading=!0,this.$store.dispatch("getClasses",this.eventId).then(function(){t.refreshDetails(),t.error=""}).catch(function(){t.error="Unable to load class details."}).then(function(){t.loading=!1})}},created:function(){!this.eventClasses[this.eventId]||this.eventClasses[this.eventId].length<1?this.triggerRefresh():this.refreshDetails()},components:{Attendees:$}},q=w,L=Object(g["a"])(q,s,i,!1,null,null,null);L.options.__file="ClassDetail.vue";e["default"]=L.exports}}]);
//# sourceMappingURL=classes.2d43172a.js.map