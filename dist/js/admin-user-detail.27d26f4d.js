(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admin-user-detail"],{"099f":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.error?i("closable-error",{on:{dismissed:function(e){t.dismissError()}}},[t._v(t._s(t.error))]):t._e(),t.loading?i("spinner-page"):i("div",[t.editing?[i("edit-profile",{attrs:{propProfile:t.user,routable:!1},on:{done:function(e){t.toggleEdit()}}})]:[i("div",{staticClass:"section"},[i("h3",{staticClass:"title is-3"},[t._v("\n          "+t._s(t.user.firstname)+" "+t._s(t.user.lastname)+"\n          "),i("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Edit User Profile",expression:"'Edit User Profile'"}],staticClass:"button is-white is-medium",attrs:{id:"edit-user-button"},on:{click:function(e){t.toggleEdit()}}},[i("span",{staticClass:"icon is-large"},[i("span",{staticClass:"fa fa-edit fa-lg",attrs:{"aria-label":"Edit"}})])])]),t.user.details.troop?i("h5",{staticClass:"subtitle is-5"},[t._v("\n          Troop "+t._s(t.user.details.troop)+", "+t._s(t.user.details.district)+" District, "+t._s(t.user.details.council)+" Council\n        ")]):t._e()]),i("div",{staticClass:"section"},[i("h5",{staticClass:"title is-5"},[t._v("User Details")]),i("ul",[i("li",[i("strong",[t._v("Email: ")]),t._v(" "+t._s(t.user.email)+"\n          ")]),i("li",[i("strong",[t._v("User Since: ")]),t._v(" "+t._s(t._f("shortDate")(t.user.created_at))+"\n          ")])])]),i("div",{staticClass:"section"},[i("h5",{staticClass:"title is-5"},[t._v("Scouts")]),t.user.scouts.length<1?i("div",{staticClass:"notification"},[t._v("\n          This user has not yet added any scouts to their troop.\n        ")]):i("table",{staticClass:"table is-striped is-fullwidth"},[i("thead",[i("tr",[i("th",[t._v("Name")]),i("th",[t._v("Birthday")]),i("th",[t._v("Emergency Contact")]),i("th",[t._v("Emergency Phone")]),i("th")])]),i("tbody",t._l(t.user.scouts,function(e){return i("tr",{key:e.id},[i("td",[t._v(t._s(e.firstname)+" "+t._s(e.lastname))]),i("td",[t._v(t._s(t._f("shortDate")(e.birthday)))]),i("td",[t._v(t._s(e.emergency_name)+" ("+t._s(e.emergency_relation)+")")]),i("td",[t._v(t._s(e.emergency_phone))]),i("td",[i("router-link",{attrs:{to:"/administration/scouts/list/"+e.id}},[t._v("Details")])],1)])}))])])]],2)],1)},r=[],o=i("bc3a"),s=i.n(o),n=i("cb15"),l=i("3fab"),d={props:{id:{required:!0}},data:function(){return{editing:!1,error:"",loading:!1,user:{}}},methods:{toggleEdit:function(){this.editing=!this.editing,this.editing||this.loadData()},dismissError:function(){this.error=""},loadData:function(){var t=this;this.loading=!0,s.a.get(l["a"].USERS_URL+this.id+"/scouts").then(function(e){t.user=e.data[0],t.error=""}).catch(function(){t.error="Failed to get user details. Please refresh or try again later."}).then(function(){t.loading=!1})}},created:function(){this.loadData()},components:{"edit-profile":n["default"]}},c=d,p=(i("7e4d"),i("2877")),u=Object(p["a"])(c,a,r,!1,null,"47f1380a",null);u.options.__file="CoordinatorDetail.vue";e["default"]=u.exports},"7e4d":function(t,e,i){"use strict";var a=i("ced4"),r=i.n(a);r.a},cb15:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"section"},[i("h4",{staticClass:"title is-4"},[t._v("Edit Your Information")]),i("form",{staticClass:"columns is-multiline"},[t.error?i("div",{staticClass:"notification is-danger"},[t._v("\n      "+t._s(t.error)+"\n    ")]):t._e(),i("div",{staticClass:"field column is-6"},[i("label",{staticClass:"label",attrs:{for:"edit-firstname"}},[t._v("First Name")]),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.profileUpdate.firstname,expression:"profileUpdate.firstname"}],staticClass:"input",class:{"is-danger":t.$v.profileUpdate.firstname.$error},attrs:{type:"text",id:"edit-firstname"},domProps:{value:t.profileUpdate.firstname},on:{blur:t.$v.profileUpdate.firstname.$touch,input:function(e){e.target.composing||t.$set(t.profileUpdate,"firstname",e.target.value)}}})]),t.$v.profileUpdate.firstname.$error?i("span",{staticClass:"help is-danger"},[t._v("\n        Please enter your first name\n      ")]):t._e()]),i("div",{staticClass:"field column is-6"},[i("label",{staticClass:"label",attrs:{for:"edit-lastname"}},[t._v("Last Name")]),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.profileUpdate.lastname,expression:"profileUpdate.lastname"}],staticClass:"input",class:{"is-danger":t.$v.profileUpdate.lastname.$error},attrs:{type:"text",id:"edit-lastname"},domProps:{value:t.profileUpdate.lastname},on:{blur:t.$v.profileUpdate.lastname.$touch,input:function(e){e.target.composing||t.$set(t.profileUpdate,"lastname",e.target.value)}}})]),t.$v.profileUpdate.lastname.$error?i("span",{staticClass:"help is-danger"},[t._v("\n        Please enter your last name\n      ")]):t._e()]),"coordinator"===t.profileToEdit.role?[i("div",{staticClass:"field column is-4"},[i("label",{staticClass:"label",attrs:{for:"edit-troop"}},[t._v("Troop")]),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.profileUpdate.coordinator.troop,expression:"profileUpdate.coordinator.troop"}],staticClass:"input",class:{"is-danger":t.$v.profileUpdate.coordinator.troop.$error},attrs:{type:"number",id:"edit-troop",placeholder:"Troop"},domProps:{value:t.profileUpdate.coordinator.troop},on:{blur:t.$v.profileUpdate.coordinator.troop.$touch,input:function(e){e.target.composing||t.$set(t.profileUpdate.coordinator,"troop",e.target.value)}}})]),t.$v.profileUpdate.coordinator.troop.$error?i("span",{staticClass:"help is-danger"},[t._v("\n          Please enter the troop you are representing\n        ")]):t._e()]),i("div",{staticClass:"field column is-4"},[i("label",{staticClass:"label",attrs:{for:"edit-district"}},[t._v("District")]),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.profileUpdate.coordinator.district,expression:"profileUpdate.coordinator.district"}],staticClass:"input",class:{"is-danger":t.$v.profileUpdate.coordinator.district.$error},attrs:{type:"text",id:"edit-district",placeholder:"District"},domProps:{value:t.profileUpdate.coordinator.district},on:{blur:t.$v.profileUpdate.coordinator.district.$touch,input:function(e){e.target.composing||t.$set(t.profileUpdate.coordinator,"district",e.target.value)}}})]),t.$v.profileUpdate.coordinator.district.$error?i("span",{staticClass:"help is-danger"},[t._v("\n          Please enter your district\n        ")]):t._e()]),i("div",{staticClass:"field column is-4"},[i("label",{staticClass:"label",attrs:{for:"edit-council"}},[t._v("Council")]),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.profileUpdate.coordinator.council,expression:"profileUpdate.coordinator.council"}],staticClass:"input",class:{"is-danger":t.$v.profileUpdate.coordinator.council.$error},attrs:{type:"text",id:"edit-council",placeholder:"Council"},domProps:{value:t.profileUpdate.coordinator.council},on:{blur:t.$v.profileUpdate.coordinator.council.$touch,input:function(e){e.target.composing||t.$set(t.profileUpdate.coordinator,"council",e.target.value)}}})]),t.$v.profileUpdate.coordinator.council.$error?i("span",{staticClass:"help is-danger"},[t._v("\n          Please enter your council\n        ")]):t._e()])]:t._e(),"teacher"===t.profileToEdit.role?[i("div",{staticClass:"field column is-12"},[i("label",{staticClass:"label",attrs:{for:"edit-chapter"}},[t._v("Chapter/Organization")]),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.profileUpdate.teacher.chapter,expression:"profileUpdate.teacher.chapter"}],staticClass:"input",class:{"is-danger":t.$v.profileUpdate.teacher.chapter.$error},attrs:{type:"text",id:"edit-chapter",placeholder:"Your group"},domProps:{value:t.profileUpdate.teacher.chapter},on:{blur:t.$v.profileUpdate.teacher.chapter.$touch,input:function(e){e.target.composing||t.$set(t.profileUpdate.teacher,"chapter",e.target.value)}}})]),t.$v.profileUpdate.teacher.chapter.$error?i("span",{staticClass:"help is-danger"},[t._v("\n          Please enter the group you are affiliated with (e.g. APO chapter)\n        ")]):t._e()])]:t._e(),i("div",{staticClass:"column is-12"},[i("div",{staticClass:"field is-grouped"},[i("div",{staticClass:"control"},[i("button",{staticClass:"button is-primary",class:{"is-loading":t.saving},attrs:{disabled:t.saving,id:"save-profile"},on:{click:function(e){e.preventDefault(),t.update()}}},[t._v("\n            Save Changes\n          ")])]),i("div",{staticClass:"control"},[i("button",{staticClass:"button",attrs:{disabled:t.saving,id:"cancel"},on:{click:function(e){e.preventDefault(),t.cancel()}}},[t._v("\n            Cancel\n          ")])])])])],2)])},r=[],o=i("c93e"),s=i("2f62"),n=i("b5ae"),l=i("2ef0"),d=i.n(l),c={props:{propProfile:{type:Object},routable:{type:Boolean,default:!0}},data:function(){return{profileUpdate:{firstname:"",lastname:"",teacher:{chapter:""},coordinator:{troop:"",district:"",council:""}},error:"",saving:!1}},computed:Object(o["a"])({},Object(s["b"])(["isAdmin","profile"]),{profileToEdit:function(){return this.propProfile?this.propProfile:this.profile}}),methods:{cancel:function(){this.routable?this.$router.push("/profile"):this.$emit("done")},update:function(){var t=this;this.saving=!0;var e={id:this.profileToEdit.id,firstname:this.profileUpdate.firstname,lastname:this.profileUpdate.lastname};switch(this.profileToEdit.role){case"coordinator":e.details=this.profileUpdate.coordinator;break;case"teacher":e.details=this.profileUpdate.teacher;break}this.$store.dispatch("updateProfile",e).then(function(){t.error="",t.cancel()}).catch(function(e){t.error="Failed to save changes. Please try again."}).then(function(){t.saving=!1})}},mounted:function(){this.profileUpdate.firstname=this.profileToEdit.firstname,this.profileUpdate.lastname=this.profileToEdit.lastname,this.profileUpdate[this.profileToEdit.role]=d.a.clone(this.profileToEdit.details)},validations:{profileUpdate:{firstname:{required:n["required"]},lastname:{required:n["required"]},coordinator:{troop:{required:n["required"],alphaNum:n["alphaNum"]},district:{required:n["required"]},council:{required:n["required"]}},teacher:{chapter:{required:n["required"]}}},basicInfo:["profileUpdate.firstname","profileUpdate.lastname"],coordinatorInfo:["profileUpdate.coordinator.troop","profileUpdate.coordinator.district","profileUpdate.coordinator.council"],teacherInfo:["profileUpdate.teacher.chapter"]}},p=c,u=i("2877"),f=Object(u["a"])(p,a,r,!1,null,null,null);f.options.__file="Edit.vue";e["default"]=f.exports},ced4:function(t,e,i){}}]);
//# sourceMappingURL=admin-user-detail.27d26f4d.js.map