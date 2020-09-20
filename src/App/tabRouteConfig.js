import React from 'react';
import { Route } from 'react-router-dom';
import _ from 'lodash';
import Dashboard from '../pages/Dashboard';
import ExpertManagement from '../pages/ExpertManagement';
import EmployerManagement from '../pages/EmployerManagement';
import ProjectManagement from '../pages/ProjectManagement';
import ProjectMatching from '../pages/ProjectMatching';
import ExpertProfile from '../pages/ExpertProfile'

const role_pages = {
    '__admin__': ['admin_dashboard', 'expert_management',
       , 'project_management', 'project_matching'],
    'expert': ['expert_profile', 'project_management']
}

function path_name_component(role) {
    return {
        admin_dashboard: { path: '/mgt/admin_dashboard', name: 'Dashboard', icon: 'fa-th-large', component: <Dashboard role={role}/> },
        expert_management: { path: '/mgt/expert_management', name: 'Expert Management', icon: 'fa-users', component: <ExpertManagement role={role}/> },
        expert_profile: { path: '/mgt/exper_profile', name: 'Profile', icon: 'fa-briefcase', component: <ExpertProfile role={role}/> },
        project_management: { path: '/mgt/project_management', name: 'Project Management', icon: 'fa-folder-open', component: <ProjectManagement role={role}/> },
        project_matching: { path: '/mgt/project_matching', name: 'Project Matching', icon: 'fa-key', component: <ProjectMatching role={role}/> }
    }
}

export function path_name(role){
    const role_objects = path_name_component(role);
    const pick_tabs = _.pick(role_objects, role_pages[role]);

    return pick_tabs;
}

export function renderRoute(role) {
    const role_objects = path_name_component(role);
    const pick_routes = _.pick(role_objects, role_pages[role]);
   
    return _.map(pick_routes, (item, index) => {
        return <Route path={item.path} key={`route-${index}`}>
            {item.component}
        </Route>
    });
}