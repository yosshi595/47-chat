import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import Room from './pages/Room'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { AuthProvider } from './AuthService'
import LoggedInRoute from './LoggedInRoute'
import UserEdit from './pages/UserEdit'


const App = () => {
    return (
        <AuthProvider>
            <h1>チャット</h1>
            <Router>
                <Switch>
                    <LoggedInRoute path="/" exact component={Room} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/useredit" exact component={UserEdit} />
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default App


// ディレクトリ内にyarn.lockがあるひと
// yarn add react-router-dom

// package-lock.jsonがあるひと
// npm install react-router-dom
// npm install firebase
// 