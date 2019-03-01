(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admin-event"],{"4e5a":function(e,a,t){"use strict";var s=t("d12b"),i=t.n(s);i.a},"68d4":function(e,a,t){},"8c78":function(e,a,t){"use strict";var s=t("68d4"),i=t.n(s);i.a},b084:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("h4",{staticClass:"title is-4"},[e._v("\n    Manage Purchasable Items\n  ")]),t("p",[e._v("\n    Use this page to manage items that scouts can purchase for events (for example: lunches,\n    t-shirts, or patches). You can give each item a name, description, as well as\n    restrict the age range of scouts can purchase an item. Scouts will be able to\n    specify which and how many of each item they would like to purchase when they\n    register.\n  ")]),e.eventLoadError?t("closable-error"):e._e(),e.eventLoading?t("spinner-page"):t("div",[t("div",{staticClass:"box purchasable-list-filters"},[t("div",{staticClass:"columns"},[t("div",{staticClass:"column is-6"},[t("div",{staticClass:"field is-horizontal"},[t("div",{staticClass:"field-label is-normal"},[t("label",{staticClass:"label"},[e._v("For Event:")])]),t("div",{staticClass:"field-body"},[t("div",{staticClass:"field"},[t("div",{staticClass:"control"},[t("events-dropdown",{on:{select:function(a){return e.pickEvent(a)}}})],1)])])])])])]),""===e.eventId?t("div",{staticClass:"notification"},[e._v("\n      Please pick an event to add offerings to. You can also\n      "),t("router-link",{attrs:{to:"/administration/events/all"}},[e._v("add an event")]),e._v("\n      if you haven't added any events already.\n    ")],1):t("div",[e.showCreate?e._e():t("button",{staticClass:"button is-primary",on:{click:function(a){return e.toggleCreate()}}},[e._v("Add a New Item")]),e.showCreate?t("create-purchasable",{attrs:{eventId:e.eventId},on:{close:function(a){return e.toggleCreate()}}}):e._e(),t("div",{staticClass:"purchasable-list"},e._l(e.purchasables,function(a){return t("purchasable",{key:a.id,attrs:{purchasable:a,eventId:e.eventId}})}),1)],1)])],1)},i=[],r=(t("7514"),t("cebc")),n=t("2f62"),l=t("2ef0"),c=t.n(l),u=t("7c19"),o=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"box"},[t("h4",{staticClass:"title is-4"},[e._v("Add a New Item")]),t("p",[e._v("\n    Add a new purchasable item for this event by filling out the form below. The name\n    and price of the item are required.\n  ")]),t("br"),e.error?t("div",{staticClass:"notification is-danger"},[t("p",[e._v("\n      "+e._s(e.error)+"\n    ")])]):e._e(),t("form",[t("div",{staticClass:"columns is-multiline"},[t("div",{staticClass:"field column is-6"},[t("label",{staticClass:"label",attrs:{for:"purchasable-create-item"}},[e._v("Item Name")]),t("div",{staticClass:"control"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.purchasable.item,expression:"purchasable.item"}],staticClass:"input",class:{"is-danger":e.$v.purchasable.item.$error},attrs:{type:"text",id:"purchasable-create-item",placeholder:"New Item"},domProps:{value:e.purchasable.item},on:{blur:e.$v.purchasable.item.$touch,input:function(a){a.target.composing||e.$set(e.purchasable,"item",a.target.value)}}})]),e.$v.purchasable.item.$error?t("span",{staticClass:"help is-danger"},[e._v("\n          Please enter the name of the item\n        ")]):e._e()]),t("div",{staticClass:"field column is-6"},[t("label",{staticClass:"label",attrs:{for:"purchasable-create-price"}},[e._v("Price")]),t("div",{staticClass:"control"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.purchasable.price,expression:"purchasable.price"}],staticClass:"input",class:{"is-danger":e.$v.purchasable.price.$error},attrs:{type:"text",placeholder:"10.00",id:"purchasable-create-price"},domProps:{value:e.purchasable.price},on:{blur:e.$v.purchasable.price.$touch,input:function(a){a.target.composing||e.$set(e.purchasable,"price",a.target.value)}}})]),e.$v.purchasable.price.$error?t("span",{staticClass:"help is-danger"},[e._v("\n          Please enter the price of the item\n        ")]):e._e()]),t("div",{staticClass:"field column is-12"},[t("label",{staticClass:"label",attrs:{for:"purchasable-create-description"}},[e._v("Description")]),t("div",{staticClass:"control"},[t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.purchasable.description,expression:"purchasable.description"}],staticClass:"textarea",attrs:{id:"purchasable-create-description",rows:"2",placeholder:"Description of this item"},domProps:{value:e.purchasable.description},on:{input:function(a){a.target.composing||e.$set(e.purchasable,"description",a.target.value)}}})])]),t("div",{staticClass:"field column is-6"},[t("div",{staticClass:"control"},[t("label",{staticClass:"checkbox"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.hasAgeRestriction,expression:"hasAgeRestriction"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.hasAgeRestriction)?e._i(e.hasAgeRestriction,null)>-1:e.hasAgeRestriction},on:{change:function(a){var t=e.hasAgeRestriction,s=a.target,i=!!s.checked;if(Array.isArray(t)){var r=null,n=e._i(t,r);s.checked?n<0&&(e.hasAgeRestriction=t.concat([r])):n>-1&&(e.hasAgeRestriction=t.slice(0,n).concat(t.slice(n+1)))}else e.hasAgeRestriction=i}}}),e._v(" This item is age restricted\n          ")])])]),t("div",{staticClass:"field column is-6"},[t("div",{staticClass:"control"},[t("label",{staticClass:"checkbox"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.purchasable.has_size,expression:"purchasable.has_size"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.purchasable.has_size)?e._i(e.purchasable.has_size,null)>-1:e.purchasable.has_size},on:{change:function(a){var t=e.purchasable.has_size,s=a.target,i=!!s.checked;if(Array.isArray(t)){var r=null,n=e._i(t,r);s.checked?n<0&&e.$set(e.purchasable,"has_size",t.concat([r])):n>-1&&e.$set(e.purchasable,"has_size",t.slice(0,n).concat(t.slice(n+1)))}else e.$set(e.purchasable,"has_size",i)}}}),e._v(" Allow scouts to select a size\n          ")])])]),e.hasAgeRestriction?[t("div",{staticClass:"field column is-6"},[t("label",{staticClass:"label",attrs:{for:"purchasable-min-age"}},[e._v("Minimum Age (If Any)")]),t("div",{staticClass:"control"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.purchasable.minimum_age,expression:"purchasable.minimum_age"}],staticClass:"input",class:{"is-danger":e.$v.purchasable.minimum_age.$error},attrs:{type:"number",id:"purchasable-min-age"},domProps:{value:e.purchasable.minimum_age},on:{blur:e.$v.purchasable.minimum_age.$touch,input:function(a){a.target.composing||e.$set(e.purchasable,"minimum_age",a.target.value)}}})]),e.$v.purchasable.minimum_age.number?e._e():t("span",{staticClass:"help is-danger"},[e._v("\n            Minimum age must be a number\n          ")]),e.$v.purchasable.minimum_age.lessThan?e._e():t("span",{staticClass:"help is-danger"},[e._v("\n            Minimum age must be less than maximum age\n          ")])]),t("div",{staticClass:"field column is-6"},[t("label",{staticClass:"label",attrs:{for:"purchasable-max-age"}},[e._v("Maximum Age (If Any)")]),t("div",{staticClass:"control"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.purchasable.maximum_age,expression:"purchasable.maximum_age"}],staticClass:"input",class:{"is-danger":e.$v.purchasable.maximum_age.$error},attrs:{type:"number",id:"purchasable-max-age"},domProps:{value:e.purchasable.maximum_age},on:{blur:e.$v.purchasable.maximum_age.$touch,input:function(a){a.target.composing||e.$set(e.purchasable,"maximum_age",a.target.value)}}})]),e.$v.purchasable.maximum_age.number?e._e():t("span",{staticClass:"help is-danger"},[e._v("\n            Maximum age must be a number\n          ")]),e.$v.purchasable.maximum_age.greaterThan?e._e():t("span",{staticClass:"help is-danger"},[e._v("\n            Maximum age must be greater than minimum age\n          ")])])]:e._e()],2),t("div",{staticClass:"field is-grouped"},[t("div",{staticClass:"control"},[t("button",{staticClass:"button is-primary",class:{"is-loading":e.creating},attrs:{disabled:e.$v.$invalid||e.creating},on:{click:function(a){return a.preventDefault(),e.createPurchasable()}}},[e._v("Create Item")])]),t("div",{staticClass:"control"},[t("button",{staticClass:"button",attrs:{disabled:e.creating},on:{click:function(a){return a.preventDefault(),e.close()}}},[e._v("Cancel")])])])])])},p=[],m=t("b5ae"),d=t("bfcb"),h={props:{eventId:{required:!0}},data:function(){return{creating:!1,error:"",hasAgeRestriction:!1,purchasable:{item:"",description:"",price:"",has_size:!1,maximum_age:"",minimum_age:""}}},methods:{createPurchasable:function(){var e=this;this.creating=!0;var a=c.a.clone(this.purchasable);a.maximum_age=this.purchasable.maximum_age?this.purchasable.maximum_age:null,a.minimum_age=this.purchasable.minimum_age?this.purchasable.minimum_age:null,this.$store.dispatch("createPurchasable",{eventId:this.eventId,purchasable:a}).then(function(){e.error="",e.close()}).catch(function(){e.error="Failed to create item. Please refresh and try again."}).then(function(){e.creating=!1})},close:function(){this.$emit("close")}},validations:{purchasable:{item:{required:m["required"]},price:{required:m["required"]},minimum_age:{number:d["g"],lessThan:Object(d["f"])("maximum_age")},maximum_age:{number:d["g"],greaterThan:Object(d["e"])("minimum_age")}}}},b=h,v=t("2877"),g=Object(v["a"])(b,o,p,!1,null,null,null),_=g.exports,f=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"box"},[t("h5",{staticClass:"title is-5"},[e._v("\n    "+e._s(e.purchasable.item)+"\n    "),t("button",{staticClass:"button edit-button is-pulled-right",on:{click:function(a){return e.toggleEdit()}}},[t("span",{staticClass:"fa fa-edit",attrs:{"aria-label":"Edit"}})])]),e.editing?e._e():t("detail",{attrs:{purchasable:e.purchasable}}),e.editing?t("edit",{attrs:{purchasable:e.purchasable,eventId:e.eventId},on:{close:function(a){return e.toggleEdit()}}}):e._e()],1)},C=[],x=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("p",[t("b",[e._v("Item Name: ")]),e._v(e._s(e.purchasable.item)+"\n  ")]),t("p",[t("b",[e._v("Price: ")]),e._v(e._s(e._f("currency")(e.purchasable.price))+"\n  ")]),e.purchasable.description?t("p",[t("b",[e._v("Description: ")]),e._v(e._s(e.purchasable.description)+"\n  ")]):e._e(),e.purchasable.has_size?t("p",[t("br"),e._v("\n    Scouts can pick a size for this item\n  ")]):e._e(),t("br"),t("p",[e._v("\n    The minimum purchaser age is: "+e._s(e.purchasable.minimum_age?e.purchasable.minimum_age:"not set")+"\n  ")]),t("p",[e._v("\n    The maximum purchaser age is: "+e._s(e.purchasable.maximum_age?e.purchasable.maximum_age:"not set")+"\n  ")])])},$=[],U={props:{purchasable:{type:Object,required:!0}}},y=U,w=Object(v["a"])(y,x,$,!1,null,null,null),A=w.exports,I=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[e.deleting?e._e():t("form",[t("div",{staticClass:"columns is-multiline"},[t("div",{staticClass:"field column is-6"},[t("label",{staticClass:"label",attrs:{for:"purchasable-update-item"}},[e._v("Item Name")]),t("div",{staticClass:"control"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.purchasableUpdate.item,expression:"purchasableUpdate.item"}],staticClass:"input",class:{"is-danger":e.$v.purchasableUpdate.item.$error},attrs:{type:"text",id:"purchasable-update-item",placeholder:"New Item"},domProps:{value:e.purchasableUpdate.item},on:{blur:e.$v.purchasableUpdate.item.$touch,input:function(a){a.target.composing||e.$set(e.purchasableUpdate,"item",a.target.value)}}})]),e.$v.purchasableUpdate.item.$error?t("span",{staticClass:"help is-danger"},[e._v("\n          Please enter the name of the item\n        ")]):e._e()]),t("div",{staticClass:"field column is-6"},[t("label",{staticClass:"label",attrs:{for:"purchasable-update-price"}},[e._v("Price")]),t("div",{staticClass:"control"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.purchasableUpdate.price,expression:"purchasableUpdate.price"}],staticClass:"input",class:{"is-danger":e.$v.purchasableUpdate.price.$error},attrs:{type:"number",placeholder:"10.00",id:"purchasable-update-price"},domProps:{value:e.purchasableUpdate.price},on:{blur:e.$v.purchasableUpdate.price.$touch,input:function(a){a.target.composing||e.$set(e.purchasableUpdate,"price",a.target.value)}}})]),e.$v.purchasableUpdate.price.$error?t("span",{staticClass:"help is-danger"},[e._v("\n          Please enter the price of the item\n        ")]):e._e()]),t("div",{staticClass:"field column is-12"},[t("label",{staticClass:"label",attrs:{for:"purchasable-update-description"}},[e._v("Description")]),t("div",{staticClass:"control"},[t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.purchasableUpdate.description,expression:"purchasableUpdate.description"}],staticClass:"textarea",attrs:{id:"purchasable-update-description",rows:"2",placeholder:"Description of this item"},domProps:{value:e.purchasableUpdate.description},on:{input:function(a){a.target.composing||e.$set(e.purchasableUpdate,"description",a.target.value)}}})])]),t("div",{staticClass:"field column is-6"},[t("label",{staticClass:"label",attrs:{for:"purchasable-update-min-age"}},[e._v("Minimum Age (If Any)")]),t("div",{staticClass:"control"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.purchasableUpdate.minimum_age,expression:"purchasableUpdate.minimum_age"}],staticClass:"input",class:{"is-danger":e.$v.purchasableUpdate.minimum_age.$error},attrs:{type:"number",id:"purchasable-update-min-age"},domProps:{value:e.purchasableUpdate.minimum_age},on:{blur:e.$v.purchasableUpdate.minimum_age.$touch,input:function(a){a.target.composing||e.$set(e.purchasableUpdate,"minimum_age",a.target.value)}}})]),e.$v.purchasableUpdate.minimum_age.number?e._e():t("span",{staticClass:"help is-danger"},[e._v("\n          Minimum age must be a number\n        ")]),e.$v.purchasableUpdate.minimum_age.lessThan?e._e():t("span",{staticClass:"help is-danger"},[e._v("\n          Minimum age must be less than maximum age\n        ")])]),t("div",{staticClass:"field column is-6"},[t("label",{staticClass:"label",attrs:{for:"purchasable-update-max-age"}},[e._v("Maximum Age (If Any)")]),t("div",{staticClass:"control"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.purchasableUpdate.maximum_age,expression:"purchasableUpdate.maximum_age"}],staticClass:"input",class:{"is-danger":e.$v.purchasableUpdate.maximum_age.$error},attrs:{type:"number",id:"purchasable-update-max-age"},domProps:{value:e.purchasableUpdate.maximum_age},on:{blur:e.$v.purchasableUpdate.maximum_age.$touch,input:function(a){a.target.composing||e.$set(e.purchasableUpdate,"maximum_age",a.target.value)}}})]),e.$v.purchasableUpdate.maximum_age.number?e._e():t("span",{staticClass:"help is-danger"},[e._v("\n          Maximum age must be a number\n        ")]),e.$v.purchasableUpdate.maximum_age.greaterThan?e._e():t("span",{staticClass:"help is-danger"},[e._v("\n          Maximum age must be greater than minimum age\n        ")])]),t("div",{staticClass:"field column is-6"},[t("div",{staticClass:"control"},[t("label",{staticClass:"checkbox"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.purchasableUpdate.has_size,expression:"purchasableUpdate.has_size"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.purchasableUpdate.has_size)?e._i(e.purchasableUpdate.has_size,null)>-1:e.purchasableUpdate.has_size},on:{change:function(a){var t=e.purchasableUpdate.has_size,s=a.target,i=!!s.checked;if(Array.isArray(t)){var r=null,n=e._i(t,r);s.checked?n<0&&e.$set(e.purchasableUpdate,"has_size",t.concat([r])):n>-1&&e.$set(e.purchasableUpdate,"has_size",t.slice(0,n).concat(t.slice(n+1)))}else e.$set(e.purchasableUpdate,"has_size",i)}}}),e._v(" Allow scouts to select a size\n          ")])])])]),t("div",{staticClass:"field is-grouped"},[t("div",{staticClass:"control"},[t("button",{staticClass:"button is-primary",class:{"is-loading":e.saving},attrs:{disabled:e.$v.$invalid||e.saving},on:{click:function(a){return a.preventDefault(),e.update()}}},[e._v("Save Changes")])]),t("div",{staticClass:"control"},[t("button",{staticClass:"button",attrs:{disabled:e.saving},on:{click:function(a){return a.preventDefault(),e.close()}}},[e._v("Cancel")])]),t("div",{staticClass:"control is-pulled-right"},[t("button",{staticClass:"button is-danger",attrs:{disabled:e.saving},on:{click:function(a){return a.preventDefault(),e.toggleDelete()}}},[e._v("Delete Item")])])])]),e.deleting?t("confirm-delete",{staticClass:"container-fluid",attrs:{"match-text":e.purchasable.item,placeholder:"Item Name"},on:{deleteSuccess:function(a){return e.deletePurchasable()},close:function(a){return e.toggleDelete()}}},[t("span",{attrs:{slot:"header"},slot:"header"},[e._v("\n      Do you really want to delete this item? This cannot be undone!\n    ")]),t("span",{attrs:{slot:"help-text"},slot:"help-text"},[e._v("\n      Enter the name of the item with correct capitalization to confirm deletion.\n      "),t("b",[e._v("This action cannot be undone, and will remove this item for any scout that\n        has purchased it.")])])]):e._e()],1)},P=[],k={props:{purchasable:{type:Object,required:!0},eventId:{required:!0}},data:function(){return{purchasableUpdate:{item:"",price:"",description:"",has_size:!1,minimum_age:"",maximum_age:""},error:"",deleting:!1,saving:!1}},methods:{update:function(){var e=this;this.purchasableUpdate.id=this.purchasable.id,this.$store.dispatch("updatePurchasable",{eventId:this.eventId,purchasable:this.purchasableUpdate}).then(function(){e.error="",e.close()}).catch(function(){e.error="Failed to update item. Please refresh and try again."})},close:function(){this.$emit("close")},deletePurchasable:function(){var e=this;this.$store.dispatch("deletePurchasable",{eventId:this.eventId,purchasableId:this.purchasable.id}).then(function(){e.error="",e.close()}).catch(function(){e.error="Failed to delete item. Please refresh and try again."})},toggleDelete:function(){this.deleting=!this.deleting}},mounted:function(){this.purchasableUpdate.item=this.purchasable.item,this.purchasableUpdate.price=this.purchasable.price,this.purchasableUpdate.description=this.purchasable.description,this.purchasableUpdate.has_size=this.purchasable.has_size,this.purchasableUpdate.minimum_age=this.purchasable.minimum_age,this.purchasableUpdate.maximum_age=this.purchasable.maximum_age},validations:{purchasableUpdate:{item:{required:m["required"]},price:{required:m["required"]},minimum_age:{number:d["g"],lessThan:Object(d["f"])("maximum_age")},maximum_age:{number:d["g"],greaterThan:Object(d["e"])("minimum_age")}}}},z=k,N=Object(v["a"])(z,I,P,!1,null,null,null),E=N.exports,D={props:{purchasable:{type:Object,required:!0},eventId:{required:!0}},data:function(){return{editing:!1}},methods:{toggleEdit:function(){this.editing=!this.editing}},components:{Detail:A,Edit:E}},j=D,q=(t("8c78"),Object(v["a"])(j,f,C,!1,null,"590bc4ed",null)),O=q.exports,T={data:function(){return{error:"",eventId:"",loading:!1,showCreate:!1}},computed:Object(r["a"])({},Object(n["b"])(["orderedEvents"]),{purchasables:function(){var e=c.a.find(this.orderedEvents,{id:this.eventId});return e?c.a.orderBy(e.purchasables,"item"):[]}}),methods:{pickEvent:function(e){this.eventId=e},toggleCreate:function(){this.showCreate=!this.showCreate}},components:{"create-purchasable":_,Purchasable:O},mixins:[u["a"]]},M=T,R=(t("4e5a"),Object(v["a"])(M,s,i,!1,null,"7f9d277e",null));a["default"]=R.exports},d12b:function(e,a,t){},fb07:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("events-list",[t("div",{attrs:{slot:"title"},slot:"title"},[t("h4",{staticClass:"title is-4"},[e._v("\n      All Events\n    ")]),t("p",[e._v("\n      This is a list of all events that have been added to this website.\n    ")]),t("br")])])},i=[],r=t("cebb"),n={components:{EventsList:r["default"]}},l=n,c=t("2877"),u=Object(c["a"])(l,s,i,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=admin-event.42136928.js.map