(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"6dCJ":function(t,e,s){"use strict";var i=s("aRdR");s.n(i).a},CiiF:function(t,e,s){"use strict";var i=s("QbLZ"),a=s.n(i),l=s("L2JU"),r={props:{user:{type:Object,required:!0}},data:function(){return{deleting:!1,confirmDelete:!1}},computed:a()({},Object(l.b)(["profile"])),methods:{clearError:function(){this.error=""},deleteUser:function(){var t=this;this.deleting=!0,this.confirmDelete=!1,this.$store.dispatch("deleteUser",this.user.id).then(function(){t.error=""}).catch(function(){t.error="Failed to delete user. Please try again later."}).then(function(){t.deleting=!1})},toggleConfirm:function(){this.confirmDelete=!this.confirmDelete}}},n=(s("H3qh"),s("KHd+")),o=Object(n.a)(r,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",[t.confirmDelete?t._e():[s("td",[t._v(t._s(t.user.fullname))]),t._v(" "),s("td",[t._v(t._s(t._f("titleCase")(t.user.role)))]),t._v(" "),s("td",[t._v(t._s(t.user.email))]),t._v(" "),s("td",[s("ul",{staticClass:"details-list"},t._l(t.user.details,function(e,i){return s("li",{key:t.user.id+i+e},[s("b",[t._v(t._s(t._f("titleCase")(i))+":")]),t._v(" "+t._s(t._f("titleCase")(e))+"\n        ")])}))]),t._v(" "),s("td",[s("div",{staticClass:"right"},[s("div",{staticClass:"field has-addons"},[s("p",{staticClass:"control"},[s("router-link",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Details",expression:"'Details'"}],staticClass:"button is-info is-outlined",attrs:{disabled:"coordinator"!=t.user.role,to:"/administration/users/current/"+t.user.id}},[s("span",{staticClass:"icon is-small"},[s("span",{staticClass:"fa fa-info-circle",attrs:{"aria-label":"Details"}})])])],1),t._v(" "),s("p",{staticClass:"control"},[s("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Delete User",expression:"'Delete User'"}],staticClass:"button is-danger is-outlined",class:{"is-loading":t.deleting},attrs:{disabled:t.deleting||t.user.id===t.profile.id},on:{click:function(e){t.toggleConfirm()}}},[t._m(0)])])])])])],t._v(" "),t.confirmDelete?[s("td",{attrs:{colspan:"5"}},[s("confirm-delete",{attrs:{"match-text":this.user.fullname,placeholder:"Full Name"},on:{deleteSuccess:function(e){t.deleteUser()},close:function(e){t.toggleConfirm()}}},[s("span",{attrs:{slot:"header"},slot:"header"},[t._v("\n          Are you sure you want to delete "+t._s(t.user.fullname)+"'s account? This cannot be undone, and will remove all data (such as scouts)\n          associated with "+t._s(t.user.fullname)+"'s account.\n        ")]),t._v(" "),s("span",{attrs:{slot:"help-text"},slot:"help-text"},[t._v("\n          Enter the full name of this user with correct capitalization to confirm that you wish to delete this user.\n          "),s("strong",[t._v("This action cannot be undone, and will remove all associated data.")])])])],1)]:t._e()],2)},[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon is-small"},[e("span",{staticClass:"fa fa-trash",attrs:{"aria-label":"Delete Account"}})])}],!1,null,"56f986bd",null).exports,c={props:{users:{required:!0,type:Array}},components:{UserRow:o}},u=Object(n.a)(c,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("paginated-items",{attrs:{target:"users",contents:t.users,showLinks:!0,table:!0},scopedSlots:t._u([{key:"row",fn:function(t){return[s("user-row",{attrs:{user:t.item}})]}}])},[s("thead",{attrs:{slot:"heading"},slot:"heading"},[s("tr",[s("th",{attrs:{width:"15%"}},[t._v("Name")]),t._v(" "),s("th",{attrs:{width:"15%"}},[t._v("Role")]),t._v(" "),s("th",{attrs:{width:"30%"}},[t._v("Email")]),t._v(" "),s("th",{attrs:{width:"30%"}},[t._v("Details")]),t._v(" "),s("th",{attrs:{width:"80px"}})])])])},[],!1,null,null,null);e.a=u.exports},H3qh:function(t,e,s){"use strict";var i=s("PPZg");s.n(i).a},PPZg:function(t,e,s){},aRdR:function(t,e,s){},"lsz+":function(t,e,s){"use strict";s.r(e);var i=/.*all\/?$/,a={computed:{isList:function(){return i.test(this.$route.path)}}},l=s("KHd+"),r=Object(l.a)(a,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this.isList?e("h4",{staticClass:"title is-4"},[this._v("Current Users")]):e("h4",{staticClass:"title is-4"},[e("router-link",{attrs:{to:"/administration/users/current/all"}},[this._v("\n      Current Users\n    ")]),this._v("\n    / User Detail\n  ")],1),this._v(" "),e("router-view")],1)},[],!1,null,null,null);e.default=r.exports},"oo/2":function(t,e,s){"use strict";s.r(e);var i=s("QbLZ"),a=s.n(i),l=s("L2JU"),r=s("LvDl"),n=s.n(r),o=s("CiiF"),c={data:function(){return{selectedRole:"all",search:"",roles:[{text:"All Users",value:"all"},{text:"Admins",value:"admin"},{text:"Coordinators/Scoutmasters",value:"coordinator"},{text:"Teachers/Volunteers",value:"teacher"},{text:"Others",value:"anonymous"}]}},computed:a()({},Object(l.b)(["users"]),{usersInRole:function(){var t=this;return"all"===this.selectedRole?this.users:n.a.filter(this.users,function(e){return e.role===t.selectedRole})},usersToDisplay:function(){var t=this;return n.a.filter(this.usersInRole,function(e){return e.fullname.toLowerCase().indexOf(t.search.toLowerCase())>-1})}}),components:{UserList:o.a}},u=(s("6dCJ"),s("KHd+")),d=Object(u.a)(c,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("p",[t._v("\n    Use this page to view current users of this website.\n  ")]),t._v(" "),s("div",{staticClass:"box user-list-filters"},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-6"},[s("div",{staticClass:"field is-horizontal"},[t._m(0),t._v(" "),s("div",{staticClass:"field-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("span",{staticClass:"select"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedRole,expression:"selectedRole"}],attrs:{id:"user-list-role-filter"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedRole=e.target.multiple?s:s[0]}}},t._l(t.roles,function(e){return s("option",{key:e.value,domProps:{value:e.value}},[t._v("\n                      "+t._s(e.text)+"\n                    ")])}))])])])])])]),t._v(" "),s("div",{staticClass:"column is-6"},[s("div",{staticClass:"field is-horizontal"},[t._m(1),t._v(" "),s("div",{staticClass:"field-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"input",attrs:{id:"user-list-find"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}})])])])])])])]),t._v(" "),s("user-list",{attrs:{users:t.usersToDisplay}})],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"field-label is-normal"},[e("label",{staticClass:"label",attrs:{for:"user-list-role-filter"}},[this._v("Role:")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"field-label is-normal"},[e("label",{staticClass:"label",attrs:{for:"user-list-find"}},[this._v("Search:")])])}],!1,null,null,null);e.default=d.exports}}]);
//# sourceMappingURL=admin-user.849365b0869b2e28365c.js.map