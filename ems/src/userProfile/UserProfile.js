// import './styles/styles.css';
import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="modal">
        <div className="modal-content">
            <h1>invites</h1>
          {children}
          <button className="modal-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  };


const UserProfile = () => {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
      };
    
      const closeModal = () => {
        setIsOpen(false);
      };

    return (
        <body>

        <div className="main-container">

            <header className="block">
                <ul className="header-menu horizontal-list">
                    <li>
                        <a className="header-menu-tab" href="#2"><span className="icon fontawesome-user scnd-font-color"></span>Account</a>
                    </li>
                    <li>
                        <a className="header-menu-tab" href="#5"><span className="icon fontawesome-star-empty scnd-font-color"></span>Favorites</a>
                    </li>
                </ul>
                <div className="profile-menu">
                    <p>Me <a href="#26"><span className="entypo-down-open scnd-font-color"></span></a></p>
                    <div className="profile-picture small-profile-picture">
                        <img width="40px" alt="Anne Hathaway picture" src="http://upload.wikimedia.org/wikipedia/commons/e/e1/Anne_Hathaway_Face.jpg"/>
                    </div>
                </div>
            </header>

            <div className="left-container container">
                <div className="menu-box block"> 
                    <h2 className="titular">MENU BOX</h2>
                    <ul className="menu-box-menu">
                        <li>
                            <a className="menu-box-tab" onClick={openModal}><span className="icon entypo-paper-plane scnd-font-color"></span>Invites<div className="menu-box-number">3</div></a>                            
                        </li>
                        <li>
                            <a className="menu-box-tab" href="#10"><span className="icon entypo-calendar scnd-font-color"></span>Events<div className="menu-box-number">5</div></a>                            
                        </li>                       
                    </ul>
                </div>
            </div>

            <div className="middle-container container">
                <div className="profile block">
                    <a className="add-button" href="#28"><span className="icon entypo-plus scnd-font-color"></span></a>
                    <div className="profile-picture big-profile-picture clear">
                        <img width="150px" alt="Anne Hathaway picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnHHni3MMXIp6Kipd3Yt9vlqXemLlZBWDG2g&usqp=CAU" />
                    </div>
                    <h1 className="user-name">Vadivelu</h1>
                    <div className="profile-description">
                        <p className="scnd-font-color">
                            Dispensing razor-sharp wit and hilarious comebacks like a boss. I've mastered the art of making you burst into laughter while silently nodding at life's absurdities.
                        </p>
                    </div>
                </div>
            </div>

            <div className="right-container container">
                <div className="profile block">
                    <div className="bio">
                        <div className="item">
                            <a>
                                Address
                            </a>
                            <span>
                                Dubai Kurukku Santhu, Dubai
                            </span>
                        </div>

                        <div className="item">
                            <a>
                                DOB
                            </a>
                            <span>
                                12 Sept. 1960
                            </span>
                        </div>

                        <div className="item">
                            <a>
                                E-Mail
                            </a>
                            <span>
                                pitchu@mani.com
                            </span>
                        </div>

                        <div className="item">
                            <a>
                                Events Attended
                            </a>
                            <span>
                                12
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <Modal isOpen={isOpen} onClose={closeModal}>
            {/* <div className='invite'>
                <div className='invite-details'>
                    <div className='invite-title'>Event Name</div>
                    <div className='invite-date'>Date</div>
                    <div className='invite-time'>Time</div>
                    <div className='invite-venue'>Venue</div>
                </div>
            </div> */}
            <div class="card">
                <div class="card-image">
                    <img src="https://picsum.photos/200/300" alt="Event Image" />
                </div>
                <div class="card-content">
                    <h3 class="event-name">Event Name</h3>
                    <p class="event-details">
                    <span class="venue">Event Venue</span>
                    <span class="datetime">Event Date and Time</span>
                    </p>
                    <div class="action-buttons">
                    <button class="accept-button">Accept</button>
                    <button class="decline-button">Decline</button>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-image">
                    <img src="https://picsum.photos/200/300" alt="Event Image" />
                </div>
                <div class="card-content">
                    <h3 class="event-name">Event Name</h3>
                    <p class="event-details">
                    <span class="venue">Event Venue</span>
                    <span class="datetime">Event Date and Time</span>
                    </p>
                    <div class="action-buttons">
                    <button class="accept-button">Accept</button>
                    <button class="decline-button">Decline</button>
                    </div>
                </div>
            </div>

        </Modal>
    </body>
    )
}

export default UserProfile;