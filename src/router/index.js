import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import app from "../component/app";
import EventReact from '../component/app/EventReact';
import FormDataFile from '../component/FormDataFile';
const { AppOther, Inbox, Message } = app;

const router = (
    <Router  forceRefresh={false} >
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/event">合成事件</Link></li>
                <li><Link to="/inbox">inbox</Link></li>
                <li><Link to="/formdatafile">formdatafile</Link></li>
                <li><Link to="/messages/3">messages</Link></li>

            </ul>
        </div>
        <div >
            <Route exact path="/" component={AppOther} />

            <Route  path="/event" component={EventReact} />
            <Route path="/inbox" component={Inbox} />
            <Route path="/messages/:id" component={Message} />
            <Route path="/formdatafile" component={FormDataFile} />
           
        </div>
    </Router>
);

export default router;