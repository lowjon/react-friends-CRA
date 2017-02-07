import React, {Component} from 'react'
import Friend from './Friend'
import friends from './friends'

class FriendList extends Component {

    constructor(props){
      super(props)

      this.state = {
        searchText: "",
        orderBy: "name",
        order: "ascending"
      }
    }

    handleChange = (field, e) => {
      this.setState({
        [field]: e.target.value
      })
    }

    render() {

      const friendsList = friends
      .filter( friend => friend.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 )
      .sort( (a,b) => a[this.state.orderBy] > b[this.state.orderBy])
      .map((friend) => {
        return (
          <Friend
            currentLocation={friend.current_location || {} }
            friendCount={friend.friend_count}
            key={friend.$$hashKey}
            name={friend.name}
            status={friend.status ? friend.status.message : ""}
            picture={friend.pic_square}
          />
        )
      })

      const displayFriends = this.state.order === "ascending" ? friendsList : friendsList.slice().reverse()

      return(
      <div>
    <form className="form-inline searchForm" role="form">
        <div className="form-group">

            <input
              className="form-control"
              placeholder="Search For Friends"
              onChange={this.handleChange.bind(this, 'searchText')}
              value={this.state.searchText}
            />

            <select
              className="input-medium"
              onChange={this.handleChange.bind(this, 'orderBy')}
              value={this.state.orderBy}
            >
                <option>Name</option>
                <option>#Friends</option>
            </select>

            <select
              className="input-medium"
              onChange={this.handleChange.bind(this, 'order')}
              value={this.state.order}
            >
                <option>Descending</option>
                <option>Ascending</option>
            </select>

        </div>
    </form>

    <ul>
      {friendsList}
    </ul>
</div>
  )}
}

export default FriendList
