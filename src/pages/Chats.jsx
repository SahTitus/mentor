import "../styles/Chats.css";
// import { Search } from "@mui/icons-material";
import { Footer, Navbar } from "../components";
import Chat from "../components/Chat";
// import BottomNavigation from "../components/BottomNavigation";
// import Appbar from "../components/Appbar";
// import { useStateContex } from "../store/StateProvider";

const Chats =() =>{
  const { darkMode } = false

  return (
    <div className={`chats ${darkMode && "chatsDark"}`}>
      <Navbar/>

      <div className={`chats__body ${darkMode && "chatsDark"}`}>
        {/* <div className="chats__search">
          <div className="chats__searchContainer">
            <Search className="searchIcon" />
            <input type="text" placeholder="Search friends..." />
          </div>
        </div> */}
        <div className="chats__chat">
          <Chat

            image="https://34co0u35pfyt37c0y0457xcu-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/iStock-1091719880-1-1-1-1.jpg"
            username="PEHJOS"
            message="send me the hacks gh   vdsvsdvdv c d9dvd9 dv dv9dvhv hff rufhr7r rvrvrvrv vrvribb b9rr brb9rubrb  vdvhdivh vvdv vdvdv vdv9dvudv v wefof ff fefhr"
            timestamp="8:00 pm"
          />
          <Chat
          group
            image="https://34co0u35pfyt37c0y0457xcu-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/iStock-1091719880-1-1-1-1.jpg"
            username="Enginners"
            message="It was a lie 😜"
            timestamp="7:58 pm"
          />
          <Chat
          group
            image="https://34co0u35pfyt37c0y0457xcu-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/iStock-1091719880-1-1-1-1.jpg"
            username="HOOKWALL"
            message="i will be dispatching the package soon"
            timestamp="7:48 pm"
          />
          <Chat
            image="https://34co0u35pfyt37c0y0457xcu-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/iStock-1091719880-1-1-1-1.jpg"
            username="Sah Titus"
            message="Thank you Sir 👍"
            timestamp="7:46 pm"
          />
          <Chat
            image="https://34co0u35pfyt37c0y0457xcu-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/iStock-1091719880-1-1-1-1.jpg"
            username="Van Dash"
            message="Just keep calm for 5 minutes 🙏 "
            timestamp="7:20 pm"
          />
          <Chat
            image="https://34co0u35pfyt37c0y0457xcu-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/iStock-1091719880-1-1-1-1.jpg"
            username="Sah Titus"
            message="Thank you Sir 👍"
            timestamp="7:46 pm"
          />
          <Chat
            image="https://34co0u35pfyt37c0y0457xcu-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/iStock-1091719880-1-1-1-1.jpg"
            username="Van Dash"
            message="Just keep calm for 5 minutes 🙏 "
            timestamp="7:20 pm"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chats;
