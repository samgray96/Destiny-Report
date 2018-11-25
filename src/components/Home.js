import React from "react";
import {
  resetTheStateAction,
  setMembershipInfoAction,
  setGambitProgressionAction,
  setCrucibleProgressionAction,
  setRaidProgressionAction,
  setActiveMembership
} from "../actions/playerActions";
import { connect } from "react-redux";
import Loading from "../components/Loading";
import MultiMembershipPopup from "./MultiMembershipPopup";

class Home extends React.Component {
  state = {
    isMore: false,
    redirectLocation: "gambit"
  };
  componentDidMount() {
    this.props.resetTheStateAction();
  }

  setActive = (e, blur) => {
    if (blur && e.target.value.length === 0) {
      e.target.parentNode.classList.remove("active");
      return;
    }
    e.target.parentNode.classList.add("active");
  };

  handleSubmit = async event => {
    event.preventDefault();
    const playerGamerTag = this.refs.gamertag.value.toLowerCase();
    const redirectLocation = this.state.redirectLocation;
    try {
      const memberships = await this.props.setMembershipInfoAction(
        playerGamerTag,
        "gambit"
      );
      if (memberships.length > 1 && this.props.player.activeMembership === -1) {
        this.setState({ isMore: true });
        return;
      }
      await this.props.setActiveMembership(0);

      if (redirectLocation === "gambit") {
        await this.props.setGambitProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
        this.props.setRaidProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
        this.props.setCrucibleProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
      } else if (redirectLocation === "crucible") {
        await this.props.setCrucibleProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
        this.props.setGambitProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
        this.props.setRaidProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
      } else {
        await this.props.setRaidProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
        this.props.setCrucibleProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
        this.props.setGambitProgressionAction(
          memberships[0].membershipType,
          memberships[0].membershipId
        );
      }

      this.props.history.push(
        `/${redirectLocation}/${memberships[0].displayName}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  handleMembershipType = async event => {
    const index = event.target.value;
    const memberships = this.props.player.memberships;
    const redirectLocation = this.state.redirectLocation;
    await this.props.setActiveMembership(index, "gambit");
    this.setState({ isMore: false });
    const activeMembership = this.props.player.activeMembership;
    if (redirectLocation === "gambit") {
      await this.props.setGambitProgressionAction(
        memberships[activeMembership].membershipType,
        memberships[activeMembership].membershipId
      );
      this.props.setRaidProgressionAction(
        memberships[activeMembership].membershipType,
        memberships[activeMembership].membershipId
      );
      this.props.setCrucibleProgressionAction(
        memberships[activeMembership].membershipType,
        memberships[activeMembership].membershipId
      );
    } else if (redirectLocation === "crucible") {
      await this.props.setCrucibleProgressionAction(
        memberships[activeMembership].membershipType,
        memberships[activeMembership].membershipId
      );
      this.props.setGambitProgressionAction(
        memberships[activeMembership].membershipType,
        memberships[activeMembership].membershipId
      );
      this.props.setRaidProgressionAction(
        memberships[activeMembership].membershipType,
        memberships[activeMembership].membershipId
      );
    } else {
      await this.props.setRaidProgressionAction(
        memberships[activeMembership].membershipType,
        memberships[activeMembership].membershipId
      );
      this.props.setGambitProgressionAction(
        memberships[activeMembership].membershipType,
        memberships[activeMembership].membershipId
      );
      this.props.setCrucibleProgressionAction(
        memberships[activeMembership].membershipType,
        memberships[activeMembership].membershipId
      );
    }

    this.props.history.push(
      `/${redirectLocation}/${memberships[activeMembership].displayName}`
    );
  };

  checkboxHandler = event => {
    this.setState({ redirectLocation: event.target.id });
  };

  render() {
    const { error, gambitIsLoading } = this.props.player;
    const errorPopup = (
      <div className="error_popup">This player doesn't exist</div>
    );

    const inputPlayerId = (
      <form className="input-form" onSubmit={this.handleSubmit}>
        <div className="search-wrapper">
          <label className="search-label" htmlFor="gamertag">
            Enter a player's name
          </label>
          <input
            className="search-input"
            type="text"
            name="gamertag"
            id="gamertag"
            ref="gamertag"
            onFocus={this.setActive}
            onBlur={event => this.setActive(event, true)}
            autoComplete="off"
          />
        </div>
        <div className="checkbox-wrapper">
          <label className="checkbox-label" htmlFor="gambit">
            <input
              className="checkbox-input"
              type="radio"
              name="page"
              id="gambit"
              onChange={this.checkboxHandler}
              defaultChecked
            />
            Gambit
            <span className="checkmark" />
          </label>
          <label className="checkbox-label" htmlFor="crucible">
            <input
              className="checkbox-input"
              type="radio"
              name="page"
              id="crucible"
              onChange={this.checkboxHandler}
            />
            Crucible
            <span className="checkmark" />
          </label>
          <label className="checkbox-label" htmlFor="raid">
            <input
              className="checkbox-input"
              type="radio"
              name="page"
              id="raid"
              onChange={this.checkboxHandler}
            />
            Raid
            <span className="checkmark" />
          </label>
        </div>
      </form>
    );
    console.log("loaaidng", gambitIsLoading);
    const isPlayerDataLoading = gambitIsLoading ? <Loading /> : inputPlayerId;
    return (
      <div className="home-wrapper">
        {error && errorPopup}
        {this.state.isMore && (
          <MultiMembershipPopup
            handleMembershipType={this.handleMembershipType}
          />
        )}

        {isPlayerDataLoading}
      </div>
    );
  }
}

const mapStoreToProps = store => {
  return {
    player: store.player
  };
};

export default connect(
  mapStoreToProps,
  {
    resetTheStateAction,
    setMembershipInfoAction,
    setGambitProgressionAction,
    setCrucibleProgressionAction,
    setRaidProgressionAction,
    setActiveMembership
  }
)(Home);
