(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admin-user"],{"0a28":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("paginated-items",{attrs:{target:"users",contents:t.users,showLinks:!0,table:!0},scopedSlots:t._u([{key:"row",fn:function(t){return[s("user-row",{attrs:{user:t.item}})]}}])},[s("thead",{attrs:{slot:"heading"},slot:"heading"},[s("tr",[s("th",{attrs:{width:"15%"}},[t._v("Name")]),s("th",{attrs:{width:"15%"}},[t._v("Role")]),s("th",{attrs:{width:"30%"}},[t._v("Email")]),s("th",{attrs:{width:"30%"}},[t._v("Details")]),s("th",{attrs:{width:"80px"}})])])])},r=[],i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",[t.confirmDelete?t._e():[s("td",[t._v(t._s(t.user.fullname))]),s("td",[t._v(t._s(t._f("titleCase")(t.user.role)))]),s("td",[t._v(t._s(t.user.email))]),s("td",[s("ul",{staticClass:"details-list"},t._l(t.user.details,function(e,a){return s("li",{key:t.user.id+a+e},[s("b",[t._v(t._s(t._f("titleCase")(a))+":")]),t._v(" "+t._s(t._f("titleCase")(e))+"\n        ")])}),0)]),s("td",[s("div",{staticClass:"right"},[s("div",{staticClass:"field has-addons"},[s("p",{staticClass:"control"},[s("router-link",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Details",expression:"'Details'"}],staticClass:"button is-info is-outlined",attrs:{disabled:"coordinator"!=t.user.role,to:"/administration/users/current/"+t.user.id}},[s("span",{staticClass:"icon is-small"},[s("span",{staticClass:"fa fa-info-circle",attrs:{"aria-label":"Details"}})])])],1),s("p",{staticClass:"control"},[s("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Delete User",expression:"'Delete User'"}],staticClass:"button is-danger is-outlined",class:{"is-loading":t.deleting},attrs:{disabled:t.deleting||t.user.id===t.profile.id},on:{click:function(e){return t.toggleConfirm()}}},[t._m(0)])])])])])],t.confirmDelete?[s("td",{attrs:{colspan:"5"}},[s("confirm-delete",{attrs:{"match-text":this.user.fullname,placeholder:"Full Name"},on:{deleteSuccess:function(e){return t.deleteUser()},close:function(e){return t.toggleConfirm()}}},[s("span",{attrs:{slot:"header"},slot:"header"},[t._v("\n          Are you sure you want to delete "+t._s(t.user.fullname)+"'s account? This cannot be undone, and will remove all data (such as scouts)\n          associated with "+t._s(t.user.fullname)+"'s account.\n        ")]),s("span",{attrs:{slot:"help-text"},slot:"help-text"},[t._v("\n          Enter the full name of this user with correct capitalization to confirm that you wish to delete this user.\n          "),s("strong",[t._v("This action cannot be undone, and will remove all associated data.")])])])],1)]:t._e()],2)},l=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon is-small"},[s("span",{staticClass:"fa fa-trash",attrs:{"aria-label":"Delete Account"}})])}],n=s("cebc"),o=s("2f62"),c={props:{user:{type:Object,required:!0}},data:function(){return{deleting:!1,confirmDelete:!1}},computed:Object(n["a"])({},Object(o["b"])(["profile"])),methods:{clearError:function(){this.error=""},deleteUser:function(){var t=this;this.deleting=!0,this.confirmDelete=!1,this.$store.dispatch("deleteUser",this.user.id).then(function(){t.error=""}).catch(function(){t.error="Failed to delete user. Please try again later."}).then(function(){t.deleting=!1})},toggleConfirm:function(){this.confirmDelete=!this.confirmDelete}}},u=c,d=(s("dfb4"),s("2877")),f=Object(d["a"])(u,i,l,!1,null,"56f986bd",null),v=f.exports,h={props:{users:{required:!0,type:Array}},components:{UserRow:v}},m=h,p=Object(d["a"])(m,a,r,!1,null,null,null);e["a"]=p.exports},"2cd7":function(t,e,s){"use strict";var a=s("fb03"),r=s.n(a);r.a},"386d":function(t,e,s){"use strict";var a=s("cb7c"),r=s("83a1"),i=s("5f1b");s("214f")("search",1,function(t,e,s,l){return[function(s){var a=t(this),r=void 0==s?void 0:s[e];return void 0!==r?r.call(s,a):new RegExp(s)[e](String(a))},function(t){var e=l(s,t,this);if(e.done)return e.value;var n=a(t),o=String(this),c=n.lastIndex;r(c,0)||(n.lastIndex=0);var u=i(n,o);return r(n.lastIndex,c)||(n.lastIndex=c),null===u?-1:u.index}]})},"83a1":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"96cc":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.isList?s("h4",{staticClass:"title is-4"},[t._v("Current Users")]):s("h4",{staticClass:"title is-4"},[s("router-link",{attrs:{to:"/administration/users/current/all"}},[t._v("\n      Current Users\n    ")]),t._v("\n    / User Detail\n  ")],1),s("router-view")],1)},r=[],i=/.*all\/?$/,l={computed:{isList:function(){return i.test(this.$route.path)}}},n=l,o=s("2877"),c=Object(o["a"])(n,a,r,!1,null,null,null);e["default"]=c.exports},a28f:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("p",[t._v("\n    Use this page to view current users of this website.\n  ")]),s("div",{staticClass:"box user-list-filters"},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-6"},[s("div",{staticClass:"field is-horizontal"},[t._m(0),s("div",{staticClass:"field-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("span",{staticClass:"select"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedRole,expression:"selectedRole"}],attrs:{id:"user-list-role-filter"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.selectedRole=e.target.multiple?s:s[0]}}},t._l(t.roles,function(e){return s("option",{key:e.value,domProps:{value:e.value}},[t._v("\n                      "+t._s(e.text)+"\n                    ")])}),0)])])])])])]),s("div",{staticClass:"column is-6"},[s("div",{staticClass:"field is-horizontal"},[t._m(1),s("div",{staticClass:"field-body"},[s("div",{staticClass:"field"},[s("div",{staticClass:"control"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"input",attrs:{id:"user-list-find"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}})])])])])])])]),s("user-list",{attrs:{users:t.usersToDisplay}})],1)},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"field-label is-normal"},[s("label",{staticClass:"label",attrs:{for:"user-list-role-filter"}},[t._v("Role:")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"field-label is-normal"},[s("label",{staticClass:"label",attrs:{for:"user-list-find"}},[t._v("Search:")])])}],i=(s("386d"),s("cebc")),l=s("2f62"),n=s("2ef0"),o=s.n(n),c=s("0a28"),u={data:function(){return{selectedRole:"all",search:"",roles:[{text:"All Users",value:"all"},{text:"Admins",value:"admin"},{text:"Coordinators/Scoutmasters",value:"coordinator"},{text:"Teachers/Volunteers",value:"teacher"},{text:"Others",value:"anonymous"}]}},computed:Object(i["a"])({},Object(l["b"])(["users"]),{usersInRole:function(){var t=this;return"all"===this.selectedRole?this.users:o.a.filter(this.users,function(e){return e.role===t.selectedRole})},usersToDisplay:function(){var t=this;return o.a.filter(this.usersInRole,function(e){return e.fullname.toLowerCase().indexOf(t.search.toLowerCase())>-1})}}),components:{UserList:c["a"]}},d=u,f=(s("2cd7"),s("2877")),v=Object(f["a"])(d,a,r,!1,null,null,null);e["default"]=v.exports},a4fe:function(t,e,s){},dfb4:function(t,e,s){"use strict";var a=s("a4fe"),r=s.n(a);r.a},fb03:function(t,e,s){}}]);
//# sourceMappingURL=admin-user.ff5ddaf3.js.map