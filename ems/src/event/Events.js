import { Link } from 'react-router-dom';

const Events = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 center-align">
                    <p>Here are the list of events</p>
                    <Link to="/events" className="waves-effect waves-light btn-large">View Events</Link>
                </div>
            </div>
        </div>

    );
    }

export default Events;