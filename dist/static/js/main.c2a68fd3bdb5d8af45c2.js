(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{AXMn:function(t,e,n){"use strict";var s=n("B0Au");n.n(s).a},B0Au:function(t,e,n){},JhTm:function(t,e,n){"use strict";n.r(e);var s=n("QbLZ"),r=n.n(s),i=n("L2JU"),a=n("d8BS"),o=n("fBmq"),c={computed:r()({},Object(i.b)(["currentEvent"])),methods:{dismissErrors:function(){this.eventLoadError=""}},mixins:[o.a],components:{EventDetail:a.a}},v=(n("AXMn"),n("KHd+")),u=Object(v.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.eventLoadError?n("closable-error",{on:{dismissError:function(e){t.dismissErrors()}}}):t._e(),t._v(" "),t.eventLoading?n("spinner-page"):n("div",[n("event-detail",{attrs:{event:t.currentEvent}})],1)],1)},[],!1,null,"c062595a",null).exports,l={computed:r()({},Object(i.b)(["isAuthenticated","isTeacher","isCoordinator","isAdmin","currentEvent"])),components:{EventSummary:u}},d=Object(v.a)(l,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[n("h1",{staticClass:"title is-1"},[t._v("\n        Welcome to MBU Online\n      ")]),t._v(" "),n("h3",{staticClass:"subtitle is-3"},[t.isAdmin?n("span",{attrs:{id:"adminWelcome"}},[t._v("\n          Get started on the\n          "),n("router-link",{attrs:{to:"/administration"}},[t._v("Administration")]),t._v(" page.\n        ")],1):t.isTeacher?n("span",{attrs:{id:"teacherWelcome"}},[t._v("\n          Get started using the\n          "),n("router-link",{attrs:{to:"/teacher"}},[t._v("Teacher")]),t._v(" page.\n        ")],1):t.isCoordinator?n("span",{attrs:{id:"coordinatorWelcome"}},[t._v("\n          Get started using the\n          "),n("router-link",{attrs:{to:"/coordinator"}},[t._v("Manage Troop")]),t._v(" page.\n        ")],1):n("span",{attrs:{id:"genericWelcome"}},[n("router-link",{attrs:{to:"/login"}},[t._v("Login")]),t._v(" or\n          "),n("router-link",{attrs:{to:"/signup"}},[t._v("signup")]),t._v(" to get started\n        ")],1)])])]),t._v(" "),n("section",{staticClass:"section"},[n("h4",{staticClass:"title is-4"},[t._v("\n      Latest Event Information\n      "),t.currentEvent?n("span",[t._v("("+t._s(t.currentEvent.semester)+" "+t._s(t.currentEvent.year)+")")]):t._e()]),t._v(" "),n("event-summary")],1)])},[],!1,null,null,null);e.default=d.exports}}]);
//# sourceMappingURL=main.c2a68fd3bdb5d8af45c2.js.map