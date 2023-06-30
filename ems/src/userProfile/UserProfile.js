import './styles/styles.css';
import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children, clear }) => {
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
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUWGRcXGBgXFRcVFxcYGBcYFxcXFRcYHyggGB0lGxoVITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0lICUvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EAEYQAAEDAgMFBQUEBwcEAgMAAAEAAhEDIQQSMQVBUWFxBhMigcEjMpGhsQdC0fAUUmJzgrLhJDNDcpKTohVTY8Kz4jRUg//EABoBAAIDAQEAAAAAAAAAAAAAAAMEAQIFAAb/xAA2EQABAwEECAYCAQQCAwAAAAABAAIRAwQSITEiQVFhcYGx8AUTkaHB0SMy8TNystJS4SRigv/aAAwDAQACEQMRAD8Ax3ZoZqzRpx3zv9FvdgbSax/d1IID3FpP3BeTG8kgX/G/nfZ5xFQEaiI8lo8LWb+kEuJyl5ki0DMV6vyg9sHYvM13FtbDYOq9gdtBophzpIOjbX1vfd9VewVTOA4afD6Lz7CbXfVreLQANi8OO5pmwM2nlyWgqbebTcyg0+NxEknTNlIa06aRdY9SyubogY58v4TlK1tcZdllzWyp2ChcSqP/AFmm0vaZ8Al3EA3+kfFNwtYvh7X52nS/PeNx0SQYRiU1UrMMNbid2rvJFWP3FTAqtwVloQ3JqkTkkSoipCq9WsG6rgF1Rw1qdi494Auq7MW02BvErN7Y281lN/iFjbeZjQolOk6o6AEF9pYxszqKPY3EhrS5pBIExIWG252tnMKbtZbpcGALbjeUD2p2ge8y3wxoRrunNxEys73xc6627N4cG6T+/tYto8QdVBuYDv0XNp1S45iZPHjz9PgqONYbb5hXscyw6n0VXaFgPzwT91K0nZK92tqk4TCMAMBjTfiQNFl8HTHitP08vL6LVdqKDm4XDmHOJosMxMtIzWIvaSLrL7PkzYRYfBJ0wNXeJWlJuunb9J5pHd5+V1G6jaURq0lwUdUfy0AVll8axwe4jSBz4f0+KbRHiFvzCs7WpEVHHoNbzAPp81HhBL/IrONPTI3rXD5pg7vhFKFEhpGvz3cUMxPv79VoMLRlpQ3EUZqa70xUp6ISVKqL5QDKrOOBys6egURZBVnaFPwM6eiTu4FPudpBCy5X2NsqMItSpmB0VKbZlWquiFTDbq33dlCG3RHu7W/oiNYgVHxCBYoeIrlMW/PJS4weIprG2nn6BLEYpofqrVICFTrK/RZbyVLE6dFao3RVKZ0lXcApGtso1YpiwQGNxRnmAo4XIUpCWVXLVS8tb2ULTVa17iLjmIOs8EbxlKK1URYPcP8AkUC7Jsa6qGucGSdSCZkgRYf0WkxlIitVaTMPcOsEiV6Slny+V522aNUncEsFinNNjv8Aoo9p4p0teSZnXmAP6JUmadVU29Zjep9EcAXpSjNKoGlbinthldjqrbVTTeHtLoBOX32nfJAty0GqtdnKtV1ORZoMZiYE23ny09Vnux+HpnD4io4nMxlhuh0XPO5RmtWIq5WwGMjuwBbLlBnmDclZ1Sm0XqTffVuHrhu2rrSYmo7bqwO8+x47cV6DhqpDQHxPESW23Sd8A2RSlUkA8V51sHFVDXfV9yi5xDs77OdMw2RciTx1uV6Bhoi1wbhYlqoeU6D3tHJeisFfzG4e+sajqzUlR8BZbtDtPIDG8iPgS7zt80R2nij7rdTwmfzosH2gqOdW1aGi0BwJm2aeJ0RrFQDni9kkPErU5zHMZwRDYW0HnEZZ95r/AIhpgLA7XxTjUMmxJPmYk/ngth2XvjaInXOLj/xvWR7VYd1PE1GOA8JOmmtuloW9Zg1toLYE3QfchZdmYTSa45S4c4aftOPujp6KtgKcuhX6D5Y2SfdVTZXv35pnUVSYa6FLtCjpfST8IVXaVP2bTy9AiO1miGxxVTagHdN6D6BCGMKKL/04oh2xxjjg8KzN4O6pyGyJIYPeuslsUTPl6rY9tqv9kw1JtOnPcUZflOecjSQDNhxte6ymwW6+Xqk7MNHLb1WvXdDH4ziPhEa9PlCa2lqiFVugT20hLhzgfPemCYWU17iMFhe0Tfbn+H+UKPZtOan8Lz9Fa7TAfpDv4f5WqLZYiod3gf6JS7p81vNdNmH9vwtDhKXgQyuz2nnwn5IzhXeFDnO9r5nXzTDgs2k83nLL1WXVraLPAzomYkeLzU+0IyM/yepSZbg5a5Ok1Bi1HqdK3kgpF1o2s8OipQbmutToAQhrPEiRpkBVWM8SJvbbREY3NBqvxCzGOHjKVIeHz9E7He+eqkotGTz9EjGkU/MNCnoCyo4ttj+d6KUB4R+d6oYwWd+d6vUGihU3aaGIjSHhHRD3Iph2y1vRLUhiUxWOCgLU7JzTy1OyosIV5FNgj2o18ls8S7NVqO4vJ5671n+wjGnF085IbImPkPjC1uJb7at+8f8AzFbtN0GN3zCw/ETBngh9E6dfwQ3tNVAawSN5sQeHDTei9JmnX8EF7YNsyb67hy3gBGMzglbIWmu0FGuxNcGniGmADSdLrmMpaQYbcyYFgSrmBxD+7y5iRwk5fgfwUP2dUx+j4h5ythkZjcgkGbC5HkU/ZwshAgvf/wDPRT4hojmeqK4faEvzkS2mGsa2bNsS8kfeJIcb8d+i9J2DjBUZYiOQiOIj8F5Ns2o5tV8Oj354HqDYrY9k+0LKNNjK1gZh8z4zJDXAaZvFBiLDWQs3xOhDJbqiPTviSnfCa16uW7QFY2rjXuzi4DbDnqCDHn8Fg6w9qVsca053gnRx+qylWn7U9U1YAGNIGz4WA+sX1nFx2jHcT3yRjstT/tlCdxd/I5Yrth4MS9mYPgnxAzoYvO/1Wz2YPbU4fkPihwFx4XaDju8157t4EVZO/wCfEpmzgmuXf+oHu49wtHw9wdTAIxl3Ro79taMYEzSbY7/vczpayg2YPGPPmrex2zRB669VX2T/AHgTH/JCc/8AqBWtqCw6qljL0x0H0RLa7fCDG/0VerVeKIyvcIjRxHwhCEwIQ6Dhdad6XbjOyjhg9pa7uqdtZ8LW84sNP6oJ2abJPVvr/Rar7R3h2AwP/c7mmXO3luRsA79d/VZfsqPF8Pqk7OSWY7+sLZtTQ2k+O8lpMZhssc+UcFDEZpAO4yHO48COavbSZ7v54DRUM1366/jqiAy1Y/6nv6WE7RVD+kPmDfdMcokkxEKLZjj3o1Fne6NbadE/tGPbu6j6BLYoPeafdfw5JQj8kbwvTB34L274Wlw9Pw6fEk+qpBvtPM+qLUKfhVLJ7TzPqnYWKyri5ZfFthxHNPx05W9PUp20x43dT9UsYPC3p6lJkZrZBm6UNAutaaNrLK71tyPCr2cZpe3ui6s61viRGqIEqpl8Sv12+HVWAzQ6hxCyWMPjPUqeiPB5+igxg8bupV3Ds9n5+gSDWy4rUeQGjknUAY3KnjSQHfneERoN8KpY5gh3T1Cmq3QQ6TpehBKJ4My0cuR66oWUX2ezwj8SlKUlyarEBspEWXcqeRbzUkJiEqXK92eqEVWjiVv69UOq1XAWc9x+N1kvs/w1OpjGsqGxEjSCQZymeN/gthtK1et+8f8AVa7HAuu7upCxfExr4DqflVGNHh6/ggXbLRnn6I+0e71PogfbBtmfxeiOk7Ef/JbzV7sdSilVj/t35gx6kK7grNVjsThgMDjHWLoYOYaCD8//AFCdszCOePCNNTuHVDDxL9xHQfavbwcNcyfePhM2RSc6vABMl09JuZ3dV6BtvBsDW56RqguYwZG2azM2IGgAcWE/5J5ATsDDMpuIGmrnHVxF4PIHcqm2e0hGIfSc5zA8NayHFvjYW1CLa5g7L8uKybbVNWphk0LS8PpCmJObiB6SUd2vhxnfALoJk854DhzWLxLPaWWn2LtWrXxFVlRjQ0AyGttJMg5jfQ/XzFbbwBpVi3dqPO4/DyU+G2pr5brhZ3ivh77O7zsIcTlqJy9Rt1pmzGB2IpN3Od6FYjtTTip5xOkrbbMdGIomJh7beaxXbLMa+YiA7duBJJgLVomK3L5Kp4cGw0zjLujUT2C72QHXco8FSOcWA53S7PAmmep+gKI7EokvAib6IzyGlxVD+7wu43CPe0Bokyq9bum0odmqEe9khtNpH3XVnRTnkJK9Nf2cY6gb7i6CYDre68i+SYmNV5/tDZDWe2xDg+LMZo2OTRZjeAGqzKdr803WYQeacNiNnY3zBv3d94oVtXb9KuynTfRbFNrWthlaqYa0NHiaBOm5c2QaAcMrWydwcadQx+rSrAF3kVo+3J7rZ2Gr0CKJc2mS1jYzl7QSS4cNZKyPZ7a1V8h7s7bS18OaeoNl1EFzZZhE6ym7QxzWEvOH9rTs3A5cOKP4hwqQabsxZ7zSC2o24u5hvFtRI5obmu7r+KvYqgHkPpE06rbtgy8c2cWjewyCNOBunBGvhjim08jmuLKrRduYAHPTP6rgQY3T0Ku2rcgO7+OELPdQ8xpczjG7WROOGsHEbSIJx2I2NTqPzPBAcXS4fcAAAJG8Try4ofhNnPo4l1N+oD+cgxBB3grXUXFoaWgE5yDmJAyuLQbgG4GY6bgpW4YVcrXAteGkMJ94OIzmi/5Fp3g9EO9D534+pE/aeFocWGkRgQADvugwd5Bw25IfSp+FUDT9oervVHqVHwmdQhGX2h6u9U6CCsym4iVS2PsOlXfWNWplyHwi/jeSYbIBjQnyQntFhBScwCYLGuAJmMwmPmtHskQ9379v8tRD+1WGNWtSY3U02dAMokkpF5hx71BblF5c8N1XQeZLh8LL4DBvqvDWNJP05ngvQn0KVNgNRwcN5LhTpz+8OvkCqWzaDKVO0Bmsu+8N1WoNSCfdZv1MXy3X48A5qbRm/wC48Bz/AOGbMHJsKaQcZA75oNrqB5BGQkTnJ1wNg2nCcACqBxGFB/u8w4inXcP9VgV2rUwz/CGuBP6h8X+2658lAds4jP8A3r/ir/8A1BjrYiiyoDq6A145yN6vccMehPyhkwRpTxDfgdIWO2vsVzSajCKlOT4m6tM6OGrStnsTsXT/AEbPVqtzlpf3eeHwADdoBIkaH0uq2HFCliGVDUFSgfeJqBlcDfSqgg963hYxa4uFW+0KnT/SGPY2A7BuIMX0qhsniAAPJJRL4B72LQc95pYiD65d/wAiCVTp4MSMpBBIMue36sUVbB4J0g5b8Krz9Kat7a21WbXe0GzTA8LTaByQfGdosQA6HDQ/dbw6IpgtmMOJQg196A/Hg3/Vcx2x8I0DI0uJn/EIiORp3vFuaHHDCm5zAZDSQq2K7SYpwINUgHh4fols8y2TxKWYWl+iI5px7Xtp6br3IDoApCLLpK4d6UoqCUT7MN/tDHDVrmkdZtovQtsAfpFYftn4wJ9VhOyGHLsSwSAJEyYGsiT+dVv9uMjEV4/WPzAK0h+44HqFk+J/qTvb0KHt+71PogfbAe4ADN//AFWmw2GJLOpn4q3i8NTaWuAzPE3InLpp+Oql1ZrCkbE0+cHxgnfZ1sd7aFU1yGNrNy5dH2Mh0HS3FGn0mtGSk0Bgt57ySdTzVTZud+/KIvz/ABKItjT+kBZdSq51Qknl0Ww9oczLbjxMwmbGaZOl5i+gn1P1WO7WYgU/0bFFocBiSSD+oYJHOxHwWlw+JIbUcLQHRv3EN9T5qlt/ZrKmCpNfdrajXHoPCfkEKrmZ1o1A4t3fx9qvRxdVuLc1mfun8A0ZmvE6mC6ZEHg53nou0VBxyOIuGieW/wCUrPNqMw7GuY1sMjwmSIBEZYIjctRQ2ozGUG1AI62mLEjlNkjYH3al6MMu96d8Zs/mWY05xz9NfBBNmgNxFEusMwPzWK7cBza+Qgg+98Ta/SF6NSogVaMk+9vuOQ6THxWF+0JhFZ+YCZExzvb4r0lmqXqw/t+V5uyUzTAB1OPuwZpvZtx7s9fQK7s3EFmd5MQck/qi5e6eIYHnqAh3Zx/hOmvpwVftLVLMHUy73VAfOm4fQlGtDoDuS6jTJtD4zzHpgttsLtg+qx0eGkG5mgWysBGUeYInqg+1a7q9Nzg0uJ/VBO/kgvZ3w0K8Rbux/DB4dArr6re5/uqZtxqcf86BRpNYbzRjI7zCvaXE3Wk4A/xtyhW/tM8NDDN+6ykxo6ljfQfRZfsyLk9Oq0v2k4b2GFBOlJhtpIpAED5b/os52VHjtqosv9Ic+pTdrGg8b/gBHatQhzXAEG3yUuLxj6dWi9hOWrLCyYbvc4Hdo1/+pvBOxNI940H83IQvtE7Lh6R4VXC/6pLA75fVRViJ71/SSsrZddPfYPrB1IziWNY4DRpcHC+4uEKqMd3lZ1EzIAiNXNDQZH7TdRxuOCgxpJoYY78lPl/iiPkhtR8YwkGCGT/wCAxl4+vUp9waG1QRhh/g3LYRGB1LY4WqKzSJHeNEuiPaMOlRtuk8D1WXDPakTvd6o44Oytr07OzeTXk5cp/Yfpycf2hA3E0wXCqweFxcC06sfBzNP5ujUXRLe+H1uST2yJ19QcnRq3jUZ509nCHu/fs/lqK5ijTBa+ozP3tIM97LlptpFz3cxORpG8PKpYR3icYj29P+V6s45knCg/8A6tSfN+HDvkhVMX8/gJwEtBcM7rRwJc4TymVne1eOJqCiN0Of1I0/hEDyRRg8KHNY12Lr59c+/hmv8lrhTaGWgS2pB3BwFMNJ4gEutvVqNS6MdaJa6IN1jcAOg/hZCLqfE6aI69jMxyge+Mo4iWwI3giZO697J+LosuNQXOyu/V8TvA8DdAs7yN4Jv525DNnOBkLzOt7/AJ+q23bxgihMf/h/PLWKGbMwrIc50Eg5iNSWzBaOeXO615a3ir32kAtqUQLgYSPlWCUYfyjn8LRqiaar7fYf0mr19Fn8ePC7ofot/i8hrOkfqm53kun5RZVHYGk8MzAHMxg092p3bXEu5GXk/u43qL+gBCo2npzK8vqIrss+Hz9Aj23KFMUAWgSadIncczmnPbrCBbJb4T19AgUhppiufxqU70oT3DX870yEcpYIx2Wzd8INpH1C9G2xSLa1UkC8ESbHwt4GV512VYTiGNEnxAxOt78tJXpm3qI72uY/VM9WtHqnnuioBuPULLt7ZBO9vsHFU8NiczmNAy8Qb793HqE/H1DIGXjuPLTVU6lL+73WkEbrlOxWLAqBlWA6+Vw0de3Q9UGoyDIS9lqAmNaJ7IrOIOV2ggybjy1RSiQGkA6629fzqqWzcMCDvJ3/ANFdw1CZ4fm08fx5JF5F4larWugc0LdUmnUG4kDyztH4jyRB3jwx36kdJ0+o80NxDctJ45yecHMSp9m4sDDEnQCetgI+NlasNY2qKOcHYvPdp1nDLeWyN+50XyzbXh5rS/Z9iXGhTpAwO9eTzByQPi35rHbQqNzkaDNI5AnwjykeQPFaj7P3FucGwbULelw789Fz2i6QrSQB3gt+GeOmTGsjdoJHzgLBducOMxM3mesre4YSWA8rLHfaLSaKhvcmdfT86JqyPIrAbvlJup6IeP8AkP8AGFQ7JUJDvL5zCi25hBUo16cXa8utw8THm50DXF38Ktdj6zRmkj7seRO/4JYivlxDnCCMx5ggm4PEFN1Jc9zeHwlg7yn+ZvM7YQ/sTQNSm9p1y904cHsgg+e7/MiTsMO4jOG3vna614+4HTvTjgqmBxAxGHb3lN4ANObvYL+En/GZfX3h1OU3isZh8TSLqIaSdabpZ4tcrgCC08jCWbVIIgYYY796vVaC433CZw56vraMMwQhf2kvPcUC05mNaGttyADo3eG6y/ZFs1AOS2v2mEspU/BYDcLC1hyCyHYqk51UASNdJE74srWV34J49U7ammXA7R0C1OLok1WSCZDTO46xB+Cy3bAFzqOGYJcX5CN8uguI6Dux1ngtdtbEMoOc7M3OwSSYyUf2nxq/SGakxxQrs7swuqOxlYEOy5KDHHxtpmSatT/yOJJ8+QQjUkAoVKn5byTnPph1MZbOIVfbrg1jWNginkYOeSo1s+d0IxA/tbv8n/oFc7QENpnX3hH++1VK4nFn/KP/AI0SmIcOfVEdiyoTu/watJsvFQyIzAyC03kHWeAUOYNeX3cxwOcal9NthU/eMmDxBB3wrezaE0rDeUM2ZWip3bjYuJB1yuEwY3jUEbwSFxAcXEJRs3Wj072HI8jqTa+DNN4vLXVqJa7cQWPghMxBzMw0m4Y2k4zo3EMa0H/dbSH8Sv7QY4d3SyEN75jhvyRmlrTqWmQRyHGQgG1cV3TqeYZmmk1rxxaWwfNU0nY8+OA6pindqXmzEtAO0GX9M/Qod2iwzm1xVu3vPF0do9vk4FHGuIpxNsvHkrBpNxFO8vkSSB4jFu/aN5iA9uoIkWIlVcCW05EPbEBzbgxrfceSvScAI77Ci1F1QCRiP2Gw7eBzBWf790xJhWa1R0WPzVHKc2hWi2bsCviHZGMPWLDmUV7g3EqtwuIDRKwDqhDhc6rYdunZu5ndg3fJtZM2xs/Z9Ami51SpXblA7qHtLi4At6gSYvpFkzt4wtrMbPu4Nw+ArpNjvyArQqGaUjLHdkD3sOYkJm2ahGJqid4+iD4+u7xeI6HfyRXbY/tNW28fRBccwjNrofopn8Y4KsfkQOtiXmQXEjqiWxz4T19EIqorsf3Slaf7J6v/AE1Yd97871xmiRF3eadT0/P4o5KUCJ9n6JNZuV0OmGxrJsvTdtPI70OjNFKRzysleW7AeW1WvBu0yFv9uYwGq+13927p4G2+SdeC57efULPtp0Xcujk51TxUug/mch3bx4a6mRpDpHwXWYi7eUId2zxmcMPCR9FdrTfE5YpOzEGpG2OkLR9kdpTFJxkkeG0yIn4i91qsOwXOsH8/P6LyvZVVzQ2pTPip5XDoNQRvG5ejYPbFOowPEjNBI1I4g/ngs200yHmFq0HiC1xy6IbXcDLf1s88LtdH0WWrbTjDNZNyHE+T6npAR/BVs1Yk6eI/6R/9/kvPNsVDmifcJaPiHfVx+CIQNe5VYCT3uUVZ5fUHVa2e4rU6otTrANfwDx7rvmR/EVisO45mmd4HwI9IW+ZSZWpZXaRlPEGbxzENI6qiLV0VtMDiZ7t+8ZQeocAQfzvWW+0d15jUxPPW3yUGxtlVmE/2mq5rbZcxEAGfdkhxLYM2jmn/AGiForxrYX3zJBPPSFayn8wwylCe1op4GcRt2HbwVXsTGfy9QpdsMy4h4Gk/gQh3Zetlf5eoV3bFYGu48Y+gTxnzp3LPrAFpGufhHNqYotoUiYIOUFp3+Gfjz1QjE7Hz0xWpVQxxt4x4hfTOzLI5O8yVJtTHZqLGwBljzsRqpC9owYJ18J1/aHpKCAWgcUSZcdYA18Fx+A2hSGSrVY1t4BAePJrZHzTMDh6jn5e/dB3NczDsPU0i6qekCVL9qjyO7IJ326kT8ist2QrnvWodIGpTvGPROVKXlE3SYBiJAHsB7Fbijs+iyswOAqFhlrQ3LQYYnM2nfM79t5ceEJ+y3l2YkySqlfExVLjun5NhM2XXAJkqLpuHgEuHaYGoE4eiBdo6ZeHU2XOYAy5oj2zXXzEWifgh/fh2LkGRBEjSzCJCodqKp/SHn9pQ7Cre2HR38pRmgApot/ESO4EfC9K2UR3fOSs3h3+3H+Y+qK7OxHsz1P0Cz2Fre1HVcwQXJJwkNGxG6u1g2rleZgCLxmEaTuINweMiwJWR7UYzMW8QwTeYMXEjWCpe1NT2nkEAxT7DoqOwxB1J6gwftGJwJ2xkr2wttPouEGWzMSRB4tIu08wtvTNN/tKdR1J7hJLCKbjb/EbHdVPMNXmNB11r3VPCeh+hVWYgqbU0Fww++/ZH2VcU27H4Zw/8mHZn+NN2Qpu1tq457S2rjWUqW9lJjWSN9mXdPByxArmRfenYioS0kncoLW7B6KtNrmHBxx2kfDQu1MfSokjDtOY2NV93RwYNGj5reUKGAxmGFSpm78McycxggsyBkA2HvHdcm+5eTvddGKD4o68fqgjF0ym6olsHvgti5uNc4kVcN/sSY3SZUVSjjb5qmGP/APIBZHZ9Yybn4pmPqmXXOh38kS/h+rfRKiz4/u71H+qObUoV4uzC1gdfAGFvmHBA6DGtqVBTuwGyAOqnifiiuxXWPl6pZr5fMAcFoOp3KcSTxz9gFaGruhUmHiPNQZ7nofouU3WRJQA1SbFq+0F/LitltXFDvG3/AMNn0K87wJJeOonotLtmvDqf7tvyLh+Cco1JzQLXQDnckWZiQhHaTFTl8/RVmYrmh+1a0lsm0/gi1qoDSQgWayxVBW17N5SLQRlJg9JuiGx8U1r8pMNfOXk46fFAOzuKaGwNMrhw+6bpmErh0NPUfghYPBKrWplrpC1uzSMzjxzNHmCfoW/6VgtrO9rVkfemOTSW/SVqNl4khwY6ZmxO+yB9pKYbjHzo6XR1b4h/P8ku6RMo9AgukIHQHiynfbz3fHTzWv7PVyS0TEhwI5tALSeuX/isp3Nxv1B9D5iPgtDsPEAVGFx950G1+892f4g6RzCgIlcS1bHDVyKgIsZAPI/d6WMdTyVLt4QXMqHRzYndmBuPmD0KuYpgbD9xADoO46OB4AkX4PUuPwjcRQfRqQDqHR7tQTlf0N5jcXjcoY8MeH8vtLU2yC0nYsPsnF5X/FWMbiwXz0QOmHMqFjxlc0lrgdxBghSYmpdaUj9lSpR04RvF4sFjUn4z2EfnVAqlWwukcT4CJUSMlHkrVdstoBzWvN8zGxOsFs6+ay+xcTFSRbVHu1Tm9zRBt7Jn8g1WMweIh9kpSeBATppXmuW5djJuTdNZjIBWf/6jaFHUx/NHlqTFFyp7axE1nHmmbLxEVAev0IQ3HVZqFOwj4cClDW01qCiPKjd8Lc0NpFrSAeaD0sXDgRxVQ4yFQGIujOqgZJNlAohtnFFxkm8epQ2s7Too8XXkqF9RLPqSU5SpwApaTrrQHEeHyKywqXRQYqyinUhdWpzClpv8Q6qfH1hkshgrXlLFYqRCk1MFUUsQqpddEqeI9nH51QcuVhtXwoLXph7JV/B1oPkuYyrMnl6KjSq3Xa1SQVN/BUuaSpEohs2rAPl6oYSrOFfCXY7STFRstRF1S65nVU1Eu8CPeQLiWCfBRTaVee7IP3Y+ZQSk9Wn19FalUhS9kulSmoVWxtSYTw+d91WxL9OSmtV0FZjBeR7ZeJgXOvyGn4KRlQiDoQgIxFgiJ2hP5hEoVhig1aRJyWtwe0adQAOcGu4Exp+qUu1FBzyyoWy9rQHXBzDRroHKAY671ja2JBMqTB4juxLLGbHy0I3/ANFd5CVbZPL0mGN2r7RFwuAd8i3/ABPx/mCt4Z0EFwME5XcnbjxlVqGMZUHjAB37vMcFMYuJMG0HpYhc3cuc7URC3mBrGpTGa4IIfHESC4cjMnhmB0hcw2KLCGP1bYm/iZ91wG/pxBH3igXY/aIzdy8kF2hm4qNHhcDzbb+EDQo3tLDOIkAZ6ckDc5v3soOo4tPuniDKoAJulAqNLdIIN272VEYpl4ytqRvFhTqTvizCeGTmsbVryvTmYllSlEAsMtLHcHCCw9dAenG3me3sAcPVNOSWnxU3H7zDMTzBBB5g7oV6dQtbdKapkVOI6f8AWXoonVlwVQqffLjqllBqo3lLXdqsUHU6YJA8DLT+yI6rGYepcIz2lfmDIOjWeQyhZ6mbpTzIcj02C6iXfJprqsSoy5ENUqBSCZVd4k+lU8QVcm6cDdKh5nmj3cFfNVMzqIppcil5QgxPqvuonOTS5NcUMvRA1ODldNQRohymBXNeue2VPmUdRyTSmVCpLsFUNXCU4OsoZXWlUDlchSgpOco5XHFTeUXVyU6kUxJpQgcUQqbMm5lHK7KveVYSlSZ5UcrigOhTCkzLoco5SBVr66FM51l0VFDmXQVIfiq3VMXqxVBEDh9d/wCeSgwr2gyd1x13fnknurhFD8MSqOBnAKVoO5Etl1SCRqOf4IVTxIaeI3/iiDMrocx0Hl9OaNTcCcCl6zcIIwRBxcHhzZDhcRra4helUsT3tNjnCHkAnUQYmQvNcNVqAtObKRpwnjffyWowzXVGiaviAHIX10TDmXsVm1n3AG4KHG1HUahABDHA+EixB1bbdzCBdp6j6zKcDMWF3M+KJ66NR6o4GRqN/wB4fFUcSKLbuIbAJMHhwnzVntBEFCoVbrgQMVg3OKc2oFe21j6dSMrZI++RBjhY38+CEgrNc4NdgZW+yXNlwjcie0MQCRBmAB8kNabpF5TAgl2KI1sKY1dy4TzUZXFxepupEpAriSGpU5rJjnymJK99RdC6VxJcVSVK6ntcol1QCuhTd4mOdKakrFxUABJdCYkq3lKlBSc6yiXVN5dCSQSSVVK6upi6plclK6kkulcuSuykkolQkuJJKy5OJSSSUrlyU5ryNEklWVKtU9oVAImRzUjNrVRo47kkkYVX7Shmmw5gLrtr1TPjN/j8VTrVnOMuJPVJJVc9zs1LWNBwCjLkikkqklWXJXEklUrkkkklClJcSSULkl1JJcuSXEkly5JJJJcuSXUkly5JJJJSuXEkklC5JJJJcuSSSSXLl//Z" alt="Event Image" />
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
                    <img src="data:image/jpeg;base64,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" alt="Event Image" />
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