import React from "react";
import {
	resetTheStateAction,
	setMembershipInfoAction,
	setGambitProgressionAction,
	setCrucibleProgressionAction,
	setRaidProgressionAction,
	setActiveMembership,
	startSetDataAction,
	setOverallRaidAcitivitesPlayed
} from "../actions";
import { connect } from "react-redux";
import Loading from "./Loading";
import MultiMembershipPopup from "./MultiMembershipPopup";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/components/Home.scss";

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
			this.searchButton.classList.remove("search-button_active");
			return;
		}
		e.target.parentNode.classList.add("active");
		this.searchButton.classList.add("search-button_active");
	};

	handleSubmit = async event => {
		event.preventDefault();

		let playerGamerTag = this.refs.gamertag.value.toLowerCase();
		if (playerGamerTag.includes("#")) {
			playerGamerTag = playerGamerTag.replace("#", "%23");
		}
		const redirectLocation = this.state.redirectLocation;
		try {
			await this.props.startSetDataAction();
			const memberships = await this.props.setMembershipInfoAction(playerGamerTag, "gambit");

			if (memberships.length > 1 && this.props.player.activeMembership === -1) {
				this.setState({ isMore: true });
				return;
			}
			await this.props.setActiveMembership(0);
			this.props.setOverallRaidAcitivitesPlayed(memberships[0].membershipType, memberships[0].membershipId);
			if (redirectLocation === "gambit") {
				await this.props.setGambitProgressionAction(memberships[0].membershipType, memberships[0].membershipId);
				this.props.setRaidProgressionAction(memberships[0].membershipType, memberships[0].membershipId);
				this.props.setCrucibleProgressionAction(memberships[0].membershipType, memberships[0].membershipId);
			} else if (redirectLocation === "crucible") {
				await this.props.setCrucibleProgressionAction(
					memberships[0].membershipType,
					memberships[0].membershipId
				);
				this.props.setGambitProgressionAction(memberships[0].membershipType, memberships[0].membershipId);
				this.props.setRaidProgressionAction(memberships[0].membershipType, memberships[0].membershipId);
			} else {
				await this.props.setRaidProgressionAction(memberships[0].membershipType, memberships[0].membershipId);
				this.props.setCrucibleProgressionAction(memberships[0].membershipType, memberships[0].membershipId);
				this.props.setGambitProgressionAction(memberships[0].membershipType, memberships[0].membershipId);
			}

			let redirectName = memberships[0].displayName;
			if (redirectName.includes("#")) {
				redirectName = redirectName.replace("#", "%23");
			}
			this.props.history.push(`/${redirectLocation}/${redirectName}`);
		} catch (err) {
			console.log(err);
		}
	};

	handleMembershipType = async event => {
		const index = event.target.value;
		const memberships = this.props.player.memberships;
		const redirectLocation = this.state.redirectLocation;
		await this.props.startSetDataAction();
		await this.props.setActiveMembership(index);
		this.setState({ isMore: false });
		const activeMembership = this.props.player.activeMembership;

		this.props.setOverallRaidAcitivitesPlayed(
			memberships[activeMembership].membershipType,
			memberships[activeMembership].membershipId
		);
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

		let redirectName = memberships[activeMembership].displayName;
		if (redirectName.includes("#")) {
			redirectName = redirectName.replace("#", "%23");
		}
		this.props.history.push(`/${redirectLocation}/${redirectName}`);
	};

	checkboxHandler = event => {
		this.setState({ redirectLocation: event.target.id });
	};

	render() {
		const { gambitIsLoading, isPlayerFound } = this.props.player;
		const errorPopup = (
			<div className="error_popup">
				Guardian not found
				<div className="pc-ids-info">Blizzard ids must be in this format name#id, example: Gladd#11693</div>
			</div>
		);

		const inputPlayerId = (
			<form className="input-form" onSubmit={this.handleSubmit}>
				<div className="search-wrapper">
					<label className="search-label" htmlFor="gamertag">
						Search for a guardian
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
					<button type="submit" className="search-button" ref={ele => (this.searchButton = ele)}>
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
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
		const isPlayerDataLoading = gambitIsLoading ? <Loading /> : inputPlayerId;
		return (
			<div className="home-wrapper">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Destiny Report</title>
				</Helmet>
				{!isPlayerFound && errorPopup}
				{this.state.isMore && <MultiMembershipPopup handleMembershipType={this.handleMembershipType} />}
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
		setActiveMembership,
		startSetDataAction,
		setOverallRaidAcitivitesPlayed
	}
)(Home);
