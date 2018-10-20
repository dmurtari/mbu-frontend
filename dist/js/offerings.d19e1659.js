(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["offerings"],{"05a2":function(e,t,i){},"198e":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h4",{staticClass:"title is-4"},[e._v("\n    Manage Merit Badge Offerings\n  ")]),i("p",[e._v("\n    Use this page to create, edit, and remove badge offerings for different events. These badges are what\n    Scoutmasters will see as being offered for an event. Add badges and edit details such which periods\n    each badge will be offered, how many class periods each badge will take to teach, and how much scouts\n    need to pay to attend class for a badge.\n  ")]),e.error||e.eventLoadError?i("closable-error"):e._e(),e.loading||e.eventLoading?i("spinner-page"):i("div",[i("div",{staticClass:"box offering-list-filters"},[i("div",{staticClass:"columns"},[i("div",{staticClass:"column is-6"},[i("div",{staticClass:"field is-horizontal"},[i("div",{staticClass:"field-label is-normal"},[i("label",{staticClass:"label"},[e._v("For Event:")])]),i("div",{staticClass:"field-body"},[i("div",{staticClass:"field"},[i("div",{staticClass:"control"},[i("events-dropdown",{on:{select:function(t){e.pickEvent(t)}}})],1)])])])]),i("div",{staticClass:"column is-6"},[i("div",{staticClass:"field is-horizontal"},[i("div",{staticClass:"field-label is-normal"},[i("label",{staticClass:"label",attrs:{for:"offering-list-offered-filter"}},[e._v("Filter by:")])]),i("div",{staticClass:"field-body"},[i("div",{staticClass:"field"},[i("div",{staticClass:"control"},[i("span",{staticClass:"select"},[i("select",{directives:[{name:"model",rawName:"v-model",value:e.offeredFilter,expression:"offeredFilter"}],staticClass:"form-control",attrs:{id:"offering-list-offered-filter"},on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.offeredFilter=t.target.multiple?i:i[0]}}},e._l(e.offeredFilters,function(t){return i("option",{key:t.value,domProps:{value:t.value}},[e._v("\n                        "+e._s(t.text)+"\n                      ")])}))])])])])])])])]),i("div",{staticClass:"offering-list"},[""===e.eventId?i("div",{staticClass:"notification"},[e._v("\n        Please pick an event to add offerings to. You can also\n        "),i("router-link",{attrs:{to:"/administration/events/all"}},[e._v("add an event")]),e._v("\n        if you haven't added any events already.\n      ")],1):i("div",e._l(e.filteredOfferings,function(t){return i("offering-row",{key:t.id,attrs:{eventId:e.eventId,badge:t}})}))])])],1)},s=[],r=(i("7f7f"),i("7514"),i("c93e")),a=i("2f62"),o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"badge-row is-flex-tablet columns is-multiline"},[e.shouldShowEdit?[i("offering-edit",{staticClass:"column auto",attrs:{badge:e.badge,eventId:e.eventId,creating:e.creating},on:{cancel:function(t){e.cancelEdit()}}})]:e._e(),e.shouldShowEdit?e._e():[i("div",{staticClass:"column is-11"},[i("h5",{staticClass:"title is-5"},[e._v(e._s(e.badge.name))])]),e.isAdmin&&e.offered?i("div",{staticClass:"column is-1"},[i("button",{staticClass:"button is-white offering-detail is-hidden-mobile",attrs:{id:"edit-button"},on:{click:function(t){e.toggleEdit()}}},[i("span",{staticClass:"fa fa-edit",attrs:{"aria-label":"Edit"}})]),i("button",{staticClass:"button offering-detail is-hidden-tablet",on:{click:function(t){e.toggleEdit()}}},[e._v("\n        Edit Offering\n      ")])]):e._e(),e.offered?[i("div",{staticClass:"column is-4 offering-detail"},[i("b",[e._v("Periods offered: ")]),e._v(e._s(e.periods)+"\n      ")]),i("div",{staticClass:"column is-4 offering-detail"},[i("b",[e._v("Duration: ")]),e._v(e._s(e.badge.duration+" "+e.durationLabel)+"\n      ")]),i("div",{staticClass:"column is-4 offering-detail"},[i("b",[e._v("Price: ")]),e._v(e._s(e._f("currency")(e.badge.price))+"\n      ")]),i("div",{staticClass:"column is-4 offering-detail"},[i("b",[e._v("Size Limit: ")]),e._v(e._s(e.badge.size_limit)+"\n      ")]),i("div",{staticClass:"column is-8 offering-detail"},[i("b",[e._v("Requirements: ")]),e._v(e._s(e.requirements)+"\n      ")])]:e._e(),!e.offered&&e.isAdmin?i("div",{staticClass:"field"},[i("div",{staticClass:"control"},[i("button",{staticClass:"button is-success create-button",class:{"is-loading":e.creating},attrs:{disabled:e.creating,id:"offer-button"},on:{click:function(t){e.createOffering()}}},[e._v("\n          Offer this Badge\n        ")])])]):e._e()]],2)},d=[],l=(i("c5f6"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.creating?i("h5",{staticClass:"title is-5"},[e._v("Create Offering for "+e._s(e.badge.name))]):i("h5",{staticClass:"title is-5"},[e._v("Editing "+e._s(e.badge.name))]),e.error?i("div",{staticClass:"notification is-danger"},[i("p",[e._v("\n      "+e._s(e.error)+"\n    ")])]):e._e(),e.invalidPeriodsError?i("div",{staticClass:"notification is-danger"},[i("p",[e._v("\n      "+e._s(e.invalidPeriodsError)+"\n    ")])]):e._e(),e.removing?e._e():i("form",{staticClass:"form"},[i("div",{staticClass:"columns is-multiline"},[i("div",{staticClass:"field column is-4"},[i("label",{staticClass:"label",attrs:{for:"offering-periods"}},[e._v("Offered Periods:")]),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.editablePeriods,expression:"editablePeriods",modifiers:{lazy:!0}}],staticClass:"input",class:{"is-danger":e.$v.offering.periods.$error},attrs:{type:"text",id:"offering-periods",placeholder:"Periods"},domProps:{value:e.editablePeriods},on:{blur:e.$v.offering.periods.$touch,change:function(t){e.editablePeriods=t.target.value}}})]),e.$v.offering.periods.$error?i("span",{staticClass:"help is-danger"},[e.$v.offering.periods.required?e._e():i("span",[e._v("\n            Enter the periods this badge will be offered (separated by commas)\n          ")]),e.$v.offering.periods.$each.$error?i("span",[e._v("\n            Periods must be 1, 2, or 3\n          ")]):e._e()]):e._e()]),i("div",{staticClass:"field column is-4"},[i("label",{staticClass:"label",attrs:{for:"offering-duration"}},[e._v("Duration of Class:")]),i("div",{staticClass:"control"},[i("span",{staticClass:"input-group select duration-select"},[i("select",{directives:[{name:"model",rawName:"v-model",value:e.offering.duration,expression:"offering.duration"}],staticClass:"input",class:{"is-danger":e.$v.offering.duration.$error},attrs:{id:"offering-duration"},on:{blur:e.$v.offering.duration.$touch,change:function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.offering,"duration",t.target.multiple?i:i[0])}}},[i("option",{attrs:{value:"1"}},[e._v("1 period")]),i("option",{attrs:{value:"2"}},[e._v("2 periods")]),i("option",{attrs:{value:"3"}},[e._v("3 periods")])])])]),e.$v.offering.duration.$error?i("span",{staticClass:"help is-danger"},[e._v("\n          Pick the duration of this class\n        ")]):e._e()]),i("div",{staticClass:"field column is-4"},[i("label",{staticClass:"label",attrs:{for:"offering-price"}},[e._v("\n          Price:\n          "),i("help-tag",{attrs:{text:"Any additional cost that the scout will need to pay\n                                to attend this class, in addition to the event fee"}})],1),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.offering.price,expression:"offering.price"}],staticClass:"input",class:{"is-danger":e.$v.offering.price.$error},attrs:{type:"number",id:"offering-price",placeholder:"Price"},domProps:{value:e.offering.price},on:{blur:e.$v.offering.price.$touch,input:function(t){t.target.composing||e.$set(e.offering,"price",t.target.value)}}})]),e.$v.offering.price.$error?i("span",{staticClass:"help is-danger"},[e._v("\n          Enter the price of this class\n        ")]):e._e()]),i("div",{staticClass:"field column is-4"},[i("label",{staticClass:"label",attrs:{for:"offering-size-limit"}},[e._v("\n          Size Limit:\n          "),i("help-tag",{attrs:{text:"The limit to the amount of scouts that can attend a single period"}})],1),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.offering.size_limit,expression:"offering.size_limit"}],staticClass:"input",class:{"is-danger":e.$v.offering.size_limit.$error},attrs:{type:"number",id:"offering-size-limit",placeholder:"Size Limit"},domProps:{value:e.offering.size_limit},on:{blur:e.$v.offering.size_limit.$touch,input:function(t){t.target.composing||e.$set(e.offering,"size_limit",t.target.value)}}})]),e.$v.offering.size_limit.$error?i("span",{staticClass:"help is-danger"},[e._v("\n          Enter the size limit for this class\n        ")]):e._e()]),i("div",{staticClass:"field column is-8"},[i("label",{staticClass:"label",attrs:{for:"offering-requirements"}},[e._v("\n          Requirements:\n          "),i("help-tag",{attrs:{text:"A list of requirements that will be covered during\n                                class."}})],1),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.editableRequirements,expression:"editableRequirements",modifiers:{lazy:!0}}],staticClass:"input",class:{"is-danger":e.$v.offering.requirements.$error},attrs:{type:"text",id:"offering-requirements",placeholder:"1, 2, 3a, 4"},domProps:{value:e.editableRequirements},on:{blur:e.$v.offering.requirements.$touch,change:function(t){e.editableRequirements=t.target.value}}})]),e.$v.offering.requirements.$error?i("span",{staticClass:"help is-danger"},[e.$v.offering.requirements.required?e._e():i("span",[e._v("\n            Please specify the requirements that will be covered\n          ")]),e.$v.offering.requirements.$each.$error?i("span",[e._v("\n            Requirements can be a combination of numbers and letters, and must be separated by commas (e.g. 1, 2a,\n            3b, 4).\n          ")]):e._e()]):e._e()])]),i("div",{staticClass:"field is-grouped"},[i("div",{staticClass:"control"},[i("button",{staticClass:"button is-primary",class:{"is-loading":e.saving},attrs:{disabled:e.$v.$invalid||e.saving},on:{click:function(t){t.preventDefault(),e.saveOffering()}}},[e._v("\n          Save Offering\n        ")])]),i("div",{staticClass:"control"},[i("button",{staticClass:"button is-light",attrs:{disabled:e.saving},on:{click:function(t){t.preventDefault(),e.toggleEdit()}}},[e._v("\n          Cancel Changes\n        ")])]),e.creating?e._e():i("div",{staticClass:"control is-pulled-right"},[i("button",{staticClass:"button is-danger",attrs:{disabled:e.saving},on:{click:function(t){t.preventDefault(),e.toggleRemove()}}},[e._v("\n          Remove\n        ")])])])]),e.removing?i("confirm-delete",{attrs:{"match-text":this.badge.name,placeholder:"Badge Name"},on:{deleteSuccess:function(t){e.deleteOffering()},close:function(t){e.toggleRemove()}}},[i("span",{attrs:{slot:"header"},slot:"header"},[e._v("\n      Do you really want to remove this offering? This cannot be undone, and will likely break existing registration\n      records!\n    ")]),i("span",{attrs:{slot:"help-text"},slot:"help-text"},[e._v("\n      Enter the full name of this badge with correct capitalization to confirm that you wish to remove this\n      offering.\n      "),i("b",[e._v("This action cannot be undone, and will delete all associated completion records and badge requests!\n        Adding this badge as an offering again will not restore previous records and requests!\n      ")])])]):e._e()],1)}),f=[],c=(i("55dd"),i("28a5"),i("b5ae")),u={props:{badge:{type:Object,required:!0},eventId:{required:!0},creating:{type:Boolean,default:!1}},data:function(){return{offering:{periods:this.badge.periods||[],duration:this.badge.duration||1,price:this.badge.price||"0.00",size_limit:this.badge.size_limit||20,requirements:this.badge.requirements||[]},invalidPeriodsError:"",removing:!1,saving:!1,error:""}},computed:{editablePeriods:{get:function(){return _.join(_.sortBy(this.offering.periods),", ")},set:function(e){this.offering.periods=_.without(_.map(_.split(e,",",3),function(e){var t=Number(_.trim(e));return isNaN(t)?null:t}),null,0)}},editableRequirements:{get:function(){return _.join(_.sortBy(this.offering.requirements),", ")},set:function(e){this.offering.requirements=_.without(_.map(_.split(e,","),function(e){return String(_.trim(e))}),null,0)}},offered:function(){return!_.isEmpty(this.badge.periods)}},methods:{deleteOffering:function(){var e=this;this.$store.dispatch("deleteOffering",{eventId:this.eventId,badgeId:this.badge.badge_id}).then(function(){e.toggleEdit(),e.error=""}).catch(function(){e.error="Failed to remove badge from this event. Please try again"})},toggleRemove:function(){this.removing=!this.removing},toggleEdit:function(){this.$emit("cancel")},saveOffering:function(){var e=this;_.pull(this.offering.periods,null);var t=this.offering.periods.sort();if(2!=this.offering.duration||_.isEqual(t,[2,3]))if(3!=this.offering.duration||_.isEqual(t,[1,2,3]))if(this.saving=!0,this.creating){var i={badge_id:this.badge.badge_id,offering:this.offering};this.$store.dispatch("createOffering",{eventId:this.eventId,details:i}).then(function(t){e.error="",e.toggleEdit()}).catch(function(t){e.error="Couldn't create offering. Please refresh and try again"}).then(function(){e.saving=!1})}else this.$store.dispatch("updateOffering",{eventId:this.eventId,badgeId:this.badge.badge_id,offering:this.offering}).then(function(){e.error="",e.toggleEdit()}).catch(function(){e.error="Failed to save badge. Please try again."}).then(function(){e.saving=!1});else this.error="For offerings that last 3 periods, periods must be 1, 2, and 3";else this.error="Offerings that last 2 periods must be assigned periods 2 and 3"}},validations:{offering:{periods:{required:c["required"],$each:{numeric:c["numeric"],between:Object(c["between"])(1,3)}},duration:{required:c["required"]},price:{required:c["required"]},requirements:{required:c["required"],$each:{alphaNum:c["alphaNum"]}},size_limit:{required:c["required"],numeric:c["numeric"]}}}},g=u,v=(i("52c9"),i("2877")),h=Object(v["a"])(g,l,f,!1,null,"17ae41f6",null);h.options.__file="OfferingEdit.vue";var m=h.exports,p={props:{badge:{type:Object,required:!0},eventId:{required:!0}},data:function(){return{creating:!1,editing:!1,error:""}},computed:Object(r["a"])({},Object(a["b"])(["isAdmin"]),{durationLabel:function(){return 1==Number(this.badge.duration)?"period ":"periods"},offered:function(){return!_.isEmpty(this.badge.periods)},periods:function(){return _.join(_.sortBy(this.badge.periods),", ")},requirements:function(){return this.badge.requirements.length<1?"None listed":_.join(_.sortBy(this.badge.requirements),", ")},shouldShowEdit:function(){return this.editing||this.creating}}),watch:{badge:function(){this.editing=!1}},methods:{createOffering:function(){this.creating=!0},cancelEdit:function(){this.creating=!1,this.editing=!1},toggleEdit:function(){this.editing=!this.editing}},components:{OfferingEdit:m}},b=p,C=(i("bd32"),Object(v["a"])(b,o,d,!1,null,"701c8df3",null));C.options.__file="OfferingRow.vue";var $=C.exports,y=i("7c19"),q={data:function(){return{eventId:"",offeredFilter:"all",offeredFilters:[{text:"All",value:"all"},{text:"Offered badges",value:"offered"},{text:"Unoffered badges",value:"unoffered"}],error:"",loading:!1}},computed:Object(r["a"])({},Object(a["b"])(["badgeIdsAndNames"]),{filteredOfferings:function(){return"offered"===this.offeredFilter?_.filter(this.offeringList,function(e){return!_.isEmpty(e.periods)}):"unoffered"===this.offeredFilter?_.filter(this.offeringList,function(e){return _.isEmpty(e.periods)}):this.offeringList},offeringList:function(){var e=_.map(this.$store.getters.offeringsForEvent(this.eventId),"details");return _.map(this.badgeIdsAndNames,function(t){var i=_.find(e,{badge_id:t.id})||{};return{badge_id:t.id,name:t.name,periods:i.periods,duration:i.duration,price:i.price,requirements:i.requirements,size_limit:i.size_limit}})}}),methods:{pickEvent:function(e){this.eventId=e}},created:function(){var e=this;this.loading=!0,this.$store.dispatch("getBadges").then(function(){e.error=""}).catch(function(){e.error="Couldn't load badges. Please try again"}).then(function(){e.loading=!1})},components:{OfferingRow:$},mixins:[y["a"]]},E=q,w=(i("c05e"),Object(v["a"])(E,n,s,!1,null,"5385aad0",null));w.options.__file="OfferingList.vue";t["default"]=w.exports},"52c9":function(e,t,i){"use strict";var n=i("d080"),s=i.n(n);s.a},"61f6":function(e,t,i){},"7c19":function(e,t,i){"use strict";i("ac6a");t["a"]={data:function(){return{eventLoading:!1,eventLoadError:""}},created:function(){var e=this;this.eventLoading=!0,Promise.all([this.$store.dispatch("getEvents"),this.$store.dispatch("getCurrentEvent")]).then(function(){e.eventLoadError=""}).catch(function(){e.eventLoadError="Failed to fetch event data. Please refresh to try again."}).then(function(){e.eventLoading=!1})}}},bd32:function(e,t,i){"use strict";var n=i("61f6"),s=i.n(n);s.a},c05e:function(e,t,i){"use strict";var n=i("05a2"),s=i.n(n);s.a},d080:function(e,t,i){}}]);
//# sourceMappingURL=offerings.d19e1659.js.map