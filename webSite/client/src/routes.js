import {
    ADMIN_ROUTE,
    PARENT_ROUTE,
    EMPLOYEE_ROUTE,
    FRONT_PAGE_ROUTE,
    LOGIN_EMPLOYEE_ROUTE,
    CHILD_ROUTE,
    CHILD_PAGE,
    EMPLOYEE_PAGE,
    PARENT_PAGE,
    PUT_PARENT,
    PUT_PARENT_PAGE,
    PUT_EMPLOYEE,
    PUT_EMPLOYEE_PAGE,
    PUT_CHILD, PUT_CHILD_PAGE, SCHEDULE, DAIRY, NEWS, STATISTIC, AUDIT
} from "./utils/consts"
import AdminPanel from "./pages/AdminPanel"
import ParentPanel from "./pages/ParentPanel"
import Employee from "./pages/EmployeePanel"
import FrontPage from "./pages/FrontPage"
import AuthEmp from "./pages/AuthEmp"
import Child from "./pages/ChildPanel";
import ChildPage from "./pages/ChildPage";
import EmployeePage from "./pages/EmployeePage";
import ParentPage from "./pages/ParentPage";
import PutParentPanel from "./pages/PutParentPanel";
import PutParentPage from "./pages/PutParentPage";
import PutEmployeePanel from "./pages/PutEmployeePanel";
import PutEmployeePage from "./pages/PutEmployeePage";
import PutChildPanel from "./pages/PutChildPanel";
import PutChildPage from "./pages/PutChildPage";
import SchedulePage from "./pages/SchedulePage";
import DairyPage from "./pages/DairyPage";
import News from "./pages/NEWS";
import StatisticPage from "./pages/StatisticPage";
import AuditPage from "./pages/AuditPage";



export const authAdminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPanel
    },
    {
        path: PUT_PARENT,
        Component: PutParentPanel
    },
    {
        path: PUT_PARENT_PAGE + '/:id',
        Component: PutParentPage
    },
    {
        path: PUT_EMPLOYEE,
        Component: PutEmployeePanel
    },
    {
        path: PUT_EMPLOYEE_PAGE + '/:id',
        Component: PutEmployeePage
    },
    {
        path:  PUT_CHILD,
        Component: PutChildPanel
    },
    {
        path: PUT_CHILD_PAGE + '/:id',
        Component: PutChildPage
    },
    {
        path: CHILD_ROUTE,
        Component: Child
    },
    {
        path:CHILD_PAGE  + '/:id',
        Component:ChildPage
    },
    {
        path: NEWS,
        Component: News
    },
    {
        path: EMPLOYEE_ROUTE,
        Component: Employee
    },
    {
        path: EMPLOYEE_PAGE + '/:id',
        Component: EmployeePage
    },
    {
        path: PARENT_ROUTE,
        Component: ParentPanel
    },
    {
        path: PARENT_PAGE + '/:id',
        Component: ParentPage
    },
    {
        path: SCHEDULE,
        Component:SchedulePage
    },
    {
        path: STATISTIC,
        Component:StatisticPage
    },
    {
        path: AUDIT + '/:id',
        Component: AuditPage
    }


]

export const authEMPRoutes = [

    {
        path: EMPLOYEE_ROUTE,
        Component: Employee
    },
    {
        path: EMPLOYEE_PAGE + '/:id',
        Component: EmployeePage
    },
    {
        path: PARENT_ROUTE,
        Component: ParentPanel
    },
    {
        path: PARENT_PAGE + '/:id',
        Component: ParentPage
    },


    {
        path: DAIRY + '/:id',
        Component: DairyPage
    },
    {
        path: SCHEDULE,
        Component:SchedulePage
    },
    {
        path: CHILD_ROUTE,
        Component: Child
    },
    {
        path:CHILD_PAGE  + '/:id',
        Component:ChildPage
    },
    {
        path: NEWS,
        Component: News
    }


]
export const authPARRoutes =[

    {
        path: CHILD_ROUTE,
        Component: Child
    },
    {
        path:CHILD_PAGE  + '/:id',
        Component:ChildPage
    },
    {
        path: SCHEDULE,
        Component:SchedulePage
    },
    {
        path: NEWS,
        Component: News
    }


]
export const publicRoutes = [
{
    path: FRONT_PAGE_ROUTE,
    Component: FrontPage
},
{
    path: LOGIN_EMPLOYEE_ROUTE,
    Component: AuthEmp
},
    {
        path: NEWS,
        Component: News
    }

]