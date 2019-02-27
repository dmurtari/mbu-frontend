(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admin"],{"4e69":function(t,s,e){},5147:function(t,s,e){var n=e("2b4c")("match");t.exports=function(t){var s=/./;try{"/./"[t](s)}catch(e){try{return s[n]=!1,!"/./"[t](s)}catch(a){}}return!0}},"56b0":function(t,s,e){"use strict";var n=e("4e69"),a=e.n(n);a.a},"57a7":function(t,s,e){"use strict";var n=e("94a8"),a=e.n(n);a.a},6547:function(t,s,e){"use strict";e.r(s);var n=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"section"},[e("h4",{staticClass:"title is-4"},[t._v("Get Started With MBU Online")]),e("p",[t._v("\n      Pick a task on the left, or start by reading the section below to see what kind of\n      tasks are available.\n    ")]),e("br"),e("h4",{staticClass:"title is-4"},[t._v("How do I...")]),e("ul",{staticClass:"faq-navigation"},[e("li",[e("a",{attrs:{href:"#manage-users"}},[t._v("Manage Users?")])]),e("li",[e("a",{attrs:{href:"#manage-scouts"}},[t._v("Manage Scouts?")])]),e("li",[e("a",{attrs:{href:"#manage-events"}},[t._v("Manage Events?")])])]),e("div",{staticClass:"question-container",attrs:{id:"manage-users"}},[e("h4",{staticClass:"title is-4"},[t._v("Managing Users")]),e("p",[t._v("\n        Any users are free to sign up for MBU Online, in one of two roles: coordinator, for\n        users coordinating their troop's attendance of an event; or teacher, for\n        users who will be teaching or volunteering at an event. However, you will\n        need to approve new accounts before a user can perform most of the tasks\n        on this site.\n      ")]),e("br"),e("h5",{staticClass:"title is-5"},[t._v("Current Users")]),e("p",[t._v("\n        This is a\n        "),e("b",[t._v("list of all current users")]),t._v(" of MBU Online. You can view user's contact\n        information from this page.\n      ")]),e("br"),e("h5",{staticClass:"title is-5"},[t._v("Need Approval")]),e("p",[t._v("\n        This page contains users who have signed up for an account, but who's account has\n        "),e("b",[t._v("not yet been approved")]),t._v(". Review each account, and\n        "),e("b",[t._v("approve")]),t._v(" or\n        "),e("b",[t._v("delete")]),t._v(" the user's account accordingly.\n      ")])]),e("div",{staticClass:"question-container",attrs:{id:"manage-scouts"}},[e("h4",{staticClass:"title is-4"},[t._v("Managing Scouts")]),e("p",[t._v("\n        This section contains tasks related to the scouts that coordinators have registered\n        to be part of an MBU event. This is where you can\n        "),e("b",[t._v("assign")]),t._v(" scouts to merit badges they have requested.\n      ")])]),e("div",{staticClass:"question-container",attrs:{id:"manage-events"}},[e("h4",{staticClass:"title is-4"},[t._v("Managing Events")]),e("p",[t._v("\n        This section is for tasks related to MBU events, such as adding\n        "),e("b",[t._v("badges offered\n        ")]),t._v(" at an event, or managing\n        "),e("b",[t._v("items available for purchase")]),t._v("\n        at an event.\n      ")]),e("br"),e("h5",{staticClass:"title is-5"},[t._v("Badges")]),e("p",[t._v("\n        This section is a list of all badges offered at any MBU events. In order to be able\n        to list a badge as offered at an event, you should add it to this list of badges first.\n      ")]),e("br"),e("h5",{staticClass:"title is-5"},[t._v("Offerings")]),e("p",[t._v("\n        Manage\n        "),e("b",[t._v("merit badge offerings")]),t._v(" here. For each event, add badges that will be tought\n        at that event. You can specify which periods the badge will be offered, the\n        duration of the class (1 or 2 periods long), as well as any additional fees\n        that scouts who take the class will need to pay.\n      ")]),e("br"),e("h5",{staticClass:"title is-5"},[t._v("Purchasables")]),e("p",[t._v("\n        This section is for\n        "),e("b",[t._v("items available for purches")]),t._v(" for MBU events. Add descriptions for items,\n        as well as information such as whether scouts can pick a size for an item,\n        and whether or not an item is age restricted.\n      ")]),e("br"),e("h5",{staticClass:"title is-5"},[t._v("Classes/Completions")]),e("p",[t._v("\n        Use this section to view a summary of attendance for all classes at an MBU event.\n        Also, "),e("strong",[t._v("completion records")]),t._v(" can be added with this section.\n      ")])])])])}],i=(e("56b0"),e("2877")),r={},o=Object(i["a"])(r,n,a,!1,null,"7fc2351f",null);s["default"]=o.exports},"94a8":function(t,s,e){},d2c8:function(t,s,e){var n=e("aae3"),a=e("be13");t.exports=function(t,s,e){if(n(s))throw TypeError("String#"+e+" doesn't accept regex!");return String(a(t))}},dc28:function(t,s,e){"use strict";e.r(s);var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("h3",{staticClass:"title is-3"},[t._v("Site Administration")]),e("h5",{staticClass:"subtitle is-5"},[t._v("\n    Manage users, edit scouts and events, and view event details.\n  ")]),t.error?e("closable-error",[t._v(t._s(t.error))]):t._e(),t.loading?e("spinner-page"):e("div",{staticClass:"columns"},[e("div",{staticClass:"column is-narrow sidebar"},[e("aside",{staticClass:"menu"},[e("p",{staticClass:"menu-label"},[t._v("Navigation")]),e("ul",{staticClass:"menu-list"},[e("router-link",{attrs:{to:"/administration/home"}},[t._v("Home")])],1),e("p",{staticClass:"menu-label"},[t._v("Manage")]),e("ul",{staticClass:"menu-list"},[e("li",[e("a",{on:{click:function(s){return t.toggleUserMenu()}}},[t._v("\n              Users\n              "),e("span",{staticClass:"toggle-icons is-pulled-right"},[t.showUserMenu?e("span",{staticClass:"fa fa-chevron-circle-up"}):e("span",{staticClass:"fa fa-chevron-circle-down"})])]),t.showUserMenu?e("ul",[e("router-link",{attrs:{to:"/administration/users/current"}},[t._v("Current Users")]),e("router-link",{attrs:{to:"/administration/users/approval"}},[t._v("\n                Need Approval \n                "),e("span",{staticClass:"tag is-pulled-right is-small",class:{"is-black":t.unapprovedUsers.length>0}},[t._v("\n                  "+t._s(t.unapprovedUsers.length)+"\n                ")])]),e("router-link",{attrs:{to:"/administration/users/admins"}},[t._v("Administrators")])],1):t._e()])]),e("ul",{staticClass:"menu-list"},[e("li",[e("a",{on:{click:function(s){return t.toggleScoutMenu()}}},[t._v("\n              Scouts\n              "),e("span",{staticClass:"toggle-icons is-pulled-right"},[t.showScoutMenu?e("span",{staticClass:"fa fa-chevron-circle-up"}):e("span",{staticClass:"fa fa-chevron-circle-down"})])]),t.showScoutMenu?e("ul",[e("router-link",{attrs:{to:"/administration/scouts/list"}},[t._v("All Scouts")]),e("router-link",{attrs:{to:"/administration/scouts/assignments"}},[t._v("Assignments")])],1):t._e()])]),e("ul",{staticClass:"menu-list"},[e("li",[e("a",{on:{click:function(s){return t.toggleEventMenu()}}},[t._v("\n              Events\n              "),e("span",{staticClass:"toggle-icons is-pulled-right"},[t.showEventMenu?e("span",{staticClass:"fa fa-chevron-circle-up"}):e("span",{staticClass:"fa fa-chevron-circle-down"})])]),t.showEventMenu?e("ul",[e("router-link",{attrs:{to:"/administration/events/all"}},[t._v("All Events")]),e("router-link",{attrs:{to:"/administration/events/badges"}},[t._v("Available Badges")]),e("router-link",{attrs:{to:"/administration/events/offerings"}},[t._v("Offerings")]),e("router-link",{attrs:{to:"/administration/events/purchasables"}},[t._v("Purchasables")]),e("router-link",{attrs:{to:"/administration/classes"}},[t._v("Classes/Completions")])],1):t._e()])])])]),e("div",{staticClass:"column"},[e("router-view")],1)])],1)},a=[],i=(e("f559"),e("cebc")),r=e("2f62"),o=e("2ef0"),c=e.n(o),l={data:function(){return{error:"",loading:!1,showEventMenu:!0,showScoutMenu:!0,showUserMenu:!0}},computed:Object(i["a"])({},Object(r["b"])(["users","unapprovedUsers"])),methods:{toggleEventMenu:function(){this.showEventMenu=!this.showEventMenu},toggleScoutMenu:function(){this.showScoutMenu=!this.showScoutMenu},toggleUserMenu:function(){this.showUserMenu=!this.showUserMenu}},watch:{$route:function(){var t=this.$route.path;c.a.startsWith(t,"/administration/events")?this.showEventMenu=!0:c.a.startsWith(t,"/administration/scouts")?this.showScoutMenu=!0:c.a.startsWith(t,"/administration/users")&&(this.showUserMenu=!0)}},created:function(){var t=this;this.loading=!0,this.$store.dispatch("getUsers").then(function(){t.unapprovedUsers.length>0&&(t.showUserMenu=!0),t.error=""}).catch(function(){t.error="Failed to load users. Please refresh or try later."}).then(function(){t.loading=!1})}},u=l,v=(e("57a7"),e("2877")),h=Object(v["a"])(u,n,a,!1,null,"f866ccd8",null);s["default"]=h.exports},f559:function(t,s,e){"use strict";var n=e("5ca1"),a=e("9def"),i=e("d2c8"),r="startsWith",o=""[r];n(n.P+n.F*e("5147")(r),"String",{startsWith:function(t){var s=i(this,t,r),e=a(Math.min(arguments.length>1?arguments[1]:void 0,s.length)),n=String(t);return o?o.call(s,n,e):s.slice(e,e+n.length)===n}})}}]);
//# sourceMappingURL=admin.c8762423.js.map