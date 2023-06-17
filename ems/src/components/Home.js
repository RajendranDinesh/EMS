//s simple landing page within 20 lines of code

import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 center-align">
                    <h4>Event Management System</h4>
                    <p>Click on the button below to view the list of events</p>
                    <Link to="/events" className="waves-effect waves-light btn-large">View Events</Link>
                </div>
            </div>
        </div>

    );
    }

export default Home;