(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"/j2m":function(e,t,s){"use strict";s.r(t);var a=s("QbLZ"),i=s.n(a),n=s("L2JU"),r=s("CiiF"),l=s("4d7F"),o=s.n(l),c=s("ta7f"),d=s("HEbw"),u=s.n(d),m={data:function(){return{credentials:{email:"",firstname:"",lastname:""},error:"",creating:!1,showSuccess:!1}},methods:{clearError:function(){this.error=""},close:function(){this.error="",this.showSuccess=!1,this.$emit("close")},createAdmin:function(){var e=this;this.creating=!0,this.showSuccess=!1;var t={email:this.credentials.email,password:u.a.randomBytes(20).toString("hex"),firstname:this.credentials.firstname,lastname:this.credentials.lastname,role:"admin",approved:!0};this.$store.dispatch("createAccount",t).then(function(t){e.$store.dispatch("approveUser",t)}).then(function(){e.error="",e.showSuccess=!0,e.$emit("created"),e.close()}).catch(function(){e.error="Error creating this account. Please try again later."}).then(function(){e.creating=!1})}},validations:{credentials:{email:{required:c.required,email:c.email,isUnique:function(e){var t=this;return""===e||new o.a(function(s,a){t.$store.dispatch("checkEmail",e).then(function(e){return s(!e)})})}},firstname:{required:c.required},lastname:{required:c.required}}}},h=(s("8zSb"),s("KHd+")),v=Object(h.a)(m,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"box"},[s("h5",{staticClass:"title is-5"},[e._v("Create a new Administrative User")]),e._v(" "),e._m(0),e._v(" "),e.showSuccess?s("div",{staticClass:"notification is-info"},[e._v("\n    The user has been successfully created. They will need to go to the login page, and\n    reset their password using the forgot password link before they will be able\n    to access their account.\n  ")]):e._e(),e._v(" "),e.error?s("closable-error",{on:{dismissed:function(t){e.clearError()}}},[e._v(e._s(e.error))]):e._e(),e._v(" "),s("form",[s("div",{staticClass:"columns is-multiline"},[s("div",{staticClass:"field column is-12"},[s("label",{staticClass:"label",attrs:{for:"signup-email"}},[e._v("Email")]),e._v(" "),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.credentials.email,expression:"credentials.email"}],staticClass:"input",class:{"is-danger":e.$v.credentials.email.$error},attrs:{type:"email",id:"signup-email",placeholder:"Your email address"},domProps:{value:e.credentials.email},on:{blur:e.$v.credentials.email.$touch,input:function(t){t.target.composing||e.$set(e.credentials,"email",t.target.value)}}})]),e._v(" "),e.$v.credentials.email.$error?s("span",[e.$v.credentials.email.isUnique?e._e():s("span",{staticClass:"help is-danger"},[e._v("\n            An account already exists with the email address you specified.\n          ")]),e._v(" "),e.$v.credentials.email.email?e._e():s("span",{staticClass:"help is-danger"},[e._v("\n            The email address you entered is invalid\n          ")]),e._v(" "),e.$v.credentials.email.required?e._e():s("span",{staticClass:"help is-danger"},[e._v("\n            An email address is required\n          ")])]):e._e()]),e._v(" "),s("div",{staticClass:"field column is-half"},[s("label",{staticClass:"label",attrs:{for:"signup-first-name"}},[e._v("First Name")]),e._v(" "),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.credentials.firstname,expression:"credentials.firstname"}],staticClass:"input",class:{"is-danger":e.$v.credentials.firstname.$error},attrs:{type:"text",id:"signup-first-name",placeholder:"First Name"},domProps:{value:e.credentials.firstname},on:{blur:e.$v.credentials.firstname.$touch,input:function(t){t.target.composing||e.$set(e.credentials,"firstname",t.target.value)}}})]),e._v(" "),!e.$v.credentials.firstname.required&&e.$v.credentials.firstname.$error?s("span",{staticClass:"help is-danger"},[e._v("\n          Please enter the user's first name\n        ")]):e._e()]),e._v(" "),s("div",{staticClass:"field column is-half"},[s("label",{staticClass:"label",attrs:{for:"signup-last-name"}},[e._v("Last Name")]),e._v(" "),s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.credentials.lastname,expression:"credentials.lastname"}],staticClass:"input",class:{"is-danger":e.$v.credentials.lastname.$error},attrs:{type:"text",id:"signup-last-name",placeholder:"Last Name"},domProps:{value:e.credentials.lastname},on:{blur:e.$v.credentials.lastname.$touch,input:function(t){t.target.composing||e.$set(e.credentials,"lastname",t.target.value)}}})]),e._v(" "),!e.$v.credentials.lastname.required&&e.$v.credentials.lastname.$error?s("span",{staticClass:"help is-danger"},[e._v("\n          Please enter the user's last name\n        ")]):e._e()])]),e._v(" "),s("div",{staticClass:"field is-grouped"},[s("div",{staticClass:"control"},[s("button",{staticClass:"button is-primary",class:{"is-loading":e.creating},attrs:{disabled:e.$v.$invalid||e.creating},on:{click:function(t){t.preventDefault(),e.createAdmin()}}},[e._v("\n          Create User")])]),e._v(" "),s("div",{staticClass:"control"},[s("button",{staticClass:"button",attrs:{disabled:e.creating},on:{click:function(t){t.preventDefault(),e.close()}}},[e._v("Cancel")])])])])],1)},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"notification is-warning"},[t("div",{staticClass:"content"},[t("p",[this._v("\n        Remember that administrative users will have full access to this website, including\n        creating, editing, and deleting any item (such as events, badges and records).\n        If a user needs to only edit completion records and assignments, they should\n        create a\n        "),t("strong",[this._v("teacher")]),this._v(" account.\n      ")]),this._v(" "),t("p",[this._v("\n        After you create the account, the new user should proceed to the login page, enter\n        the email that you used to create the account, and reset their password using\n        the forgot password link.\n      ")])])])}],!1,null,"e0b1fa8e",null).exports,f={data:function(){return{createAdmin:!1,error:"",loading:!1}},computed:i()({},Object(n.b)(["admins"])),methods:{clearError:function(){this.error=""},toggleCreate:function(){this.createAdmin=!this.createAdmin},refreshUsers:function(){var e=this;this.loading=!0,this.$store.dispatch("getUsers").then(function(){e.error=""}).catch(function(){e.error="Failed to get users. Please try again later."}).then(function(){e.loading=!1})}},created:function(){this.refreshUsers()},components:{CreateAdminForm:v,UserList:r.a}},p=(s("fKRH"),Object(h.a)(f,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h4",{staticClass:"title is-4"},[e._v("\n    Manage Administrative Users\n  ")]),e._v(" "),e._m(0),e._v(" "),e.error?s("closable-error",{on:{dismissed:function(t){e.clearError()}}},[e._v(e._s(e.error))]):e._e(),e._v(" "),e.loading?s("spinner-page"):s("div",[e.createAdmin?e._e():s("button",{staticClass:"button is-primary",on:{click:function(t){e.toggleCreate()}}},[e._v("Create a new Admin")]),e._v(" "),e.createAdmin?s("create-admin-form",{on:{close:function(t){e.toggleCreate()},created:function(t){e.refreshUsers()}}}):e._e(),e._v(" "),s("user-list",{staticClass:"admins",attrs:{users:e.admins}})],1)],1)},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content"},[t("p",[this._v("\n      Manage users that have administrative access to this website. Administrative have\n      complete access to this website to create, edit, and delete anything. Administrative\n      users cannot use their account to register scouts for events.\n    ")]),this._v(" "),t("p",[t("strong",[this._v("\n        Currently, you must create a new account for administrators manually, and the email\n        address used can not be used with any other account.\n      ")])])])}],!1,null,"3cfe1b4c",null));t.default=p.exports},28:function(e,t){},29:function(e,t){},30:function(e,t){},"8zSb":function(e,t,s){"use strict";var a=s("Kxsn");s.n(a).a},CiiF:function(e,t,s){"use strict";var a=s("QbLZ"),i=s.n(a),n=s("L2JU"),r={props:{user:{type:Object,required:!0}},data:function(){return{deleting:!1,confirmDelete:!1}},computed:i()({},Object(n.b)(["profile"])),methods:{clearError:function(){this.error=""},deleteUser:function(){var e=this;this.deleting=!0,this.confirmDelete=!1,this.$store.dispatch("deleteUser",this.user.id).then(function(){e.error=""}).catch(function(){e.error="Failed to delete user. Please try again later."}).then(function(){e.deleting=!1})},toggleConfirm:function(){this.confirmDelete=!this.confirmDelete}}},l=(s("H3qh"),s("KHd+")),o=Object(l.a)(r,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("tr",[e.confirmDelete?e._e():[s("td",[e._v(e._s(e.user.fullname))]),e._v(" "),s("td",[e._v(e._s(e._f("titleCase")(e.user.role)))]),e._v(" "),s("td",[e._v(e._s(e.user.email))]),e._v(" "),s("td",[s("ul",{staticClass:"details-list"},e._l(e.user.details,function(t,a){return s("li",{key:e.user.id+a+t},[s("b",[e._v(e._s(e._f("titleCase")(a))+":")]),e._v(" "+e._s(e._f("titleCase")(t))+"\n        ")])}))]),e._v(" "),s("td",[s("div",{staticClass:"right"},[s("div",{staticClass:"field has-addons"},[s("p",{staticClass:"control"},[s("router-link",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Details",expression:"'Details'"}],staticClass:"button is-info is-outlined",attrs:{disabled:"coordinator"!=e.user.role,to:"/administration/users/current/"+e.user.id}},[s("span",{staticClass:"icon is-small"},[s("span",{staticClass:"fa fa-info-circle",attrs:{"aria-label":"Details"}})])])],1),e._v(" "),s("p",{staticClass:"control"},[s("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Delete User",expression:"'Delete User'"}],staticClass:"button is-danger is-outlined",class:{"is-loading":e.deleting},attrs:{disabled:e.deleting||e.user.id===e.profile.id},on:{click:function(t){e.toggleConfirm()}}},[e._m(0)])])])])])],e._v(" "),e.confirmDelete?[s("td",{attrs:{colspan:"5"}},[s("confirm-delete",{attrs:{"match-text":this.user.fullname,placeholder:"Full Name"},on:{deleteSuccess:function(t){e.deleteUser()},close:function(t){e.toggleConfirm()}}},[s("span",{attrs:{slot:"header"},slot:"header"},[e._v("\n          Are you sure you want to delete "+e._s(e.user.fullname)+"'s account? This cannot be undone, and will remove all data (such as scouts)\n          associated with "+e._s(e.user.fullname)+"'s account.\n        ")]),e._v(" "),s("span",{attrs:{slot:"help-text"},slot:"help-text"},[e._v("\n          Enter the full name of this user with correct capitalization to confirm that you wish to delete this user.\n          "),s("strong",[e._v("This action cannot be undone, and will remove all associated data.")])])])],1)]:e._e()],2)},[function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"icon is-small"},[t("span",{staticClass:"fa fa-trash",attrs:{"aria-label":"Delete Account"}})])}],!1,null,"56f986bd",null).exports,c={props:{users:{required:!0,type:Array}},components:{UserRow:o}},d=Object(l.a)(c,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("paginated-items",{attrs:{target:"users",contents:e.users,showLinks:!0,table:!0},scopedSlots:e._u([{key:"row",fn:function(e){return[s("user-row",{attrs:{user:e.item}})]}}])},[s("thead",{attrs:{slot:"heading"},slot:"heading"},[s("tr",[s("th",{attrs:{width:"15%"}},[e._v("Name")]),e._v(" "),s("th",{attrs:{width:"15%"}},[e._v("Role")]),e._v(" "),s("th",{attrs:{width:"30%"}},[e._v("Email")]),e._v(" "),s("th",{attrs:{width:"30%"}},[e._v("Details")]),e._v(" "),s("th",{attrs:{width:"80px"}})])])])},[],!1,null,null,null);t.a=d.exports},H3qh:function(e,t,s){"use strict";var a=s("PPZg");s.n(a).a},Kxsn:function(e,t,s){},PPZg:function(e,t,s){},fKRH:function(e,t,s){"use strict";var a=s("ySWr");s.n(a).a},ySWr:function(e,t,s){}}]);
//# sourceMappingURL=admin-admins.d1cafe84bfc3414d2d65.js.map