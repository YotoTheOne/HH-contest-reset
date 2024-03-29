// ==UserScript==
// @name         HaremHeroes contest reset
// @namespace    https://github.com/YotoTheOne/HHcontest
// @version      1
// @description  HaremHeroes contest reset
// @author       roukys and YotoTheOne
// @match        http*://nutaku.haremheroes.com/*
// @match        http*://*.hentaiheroes.com/*
// @match        http*://*.gayharem.com/*
// @license      MIT
// @updateURL   https://github.com/YotoTheOne/HHcontest/raw/main/HH_daily_reset
// @downloadURL https://github.com/YotoTheOne/HHcontest/raw/main/HH_daily_reset
// ==/UserScript==


const autoQuestDefaultThreshold = "95";
const autoTrollDefaultThreshold = "18";
const autoSeasonDefaultThreshold = "8";
const autoLeaguesDefaultThreshold = "13";
const autoMissionCollectDefault = true;

const contestEndHour = 13;
const contestEndMinute = 0;
const minutesToSpendLeague = 70;
const minutesToSpendSeason = 70;

var currentTime = new Date();
var currentDay = currentTime.getDate();
var msToContestEnd = (new Date(currentTime.getFullYear(), currentTime.getMonth(), currentDay, contestEndHour, contestEndMinute).getTime()-currentTime.getTime());
var msToContestStart = msToContestEnd + 1800000;

if (msToContestStart >= 0)
{
	if (msToContestEnd >= 0)
	{
		if (currentTime.getDay() == 4)
		{
			var msToUseAllLeague = msToContestEnd - (minutesToSpendLeague * 60000);

			if (msToUseAllLeague >= 0)
			{
				console.log("End of league today. setting league threshold to 0 in "+msToUseAllLeague+" ms.");
				setTimeout(useAllLeague, msToUseAllLeague);
			}
		}

		if (currentDay == 1)		// first day of the month
		//if (currentDay == (new Date(currentTime.getFullYear(), currentTime.getMonth()+1, 0).getDate()))		// last day of the month
		{
			var msToUseAllSeason = msToContestEnd - (minutesToSpendSeason * 60000);

			if (msToUseAllSeason >= 0)
			{
				console.log("End of season today. setting season threshold to 0 in "+msToUseAllSeason+" ms.");
				setTimeout(useAllSeason, msToUseAllSeason);
			}
		}

		console.log("Contest ends in "+msToContestEnd+" ms.");
		setTimeout(contestEnd, msToContestEnd);
	}
	else
	{
		// console.log("Contest already ended today.");
		console.log("Contest starts in "+msToContestStart+" ms.");
	}
	//  console.log("Contest starts in "+msToContestStart+" ms.");
	setTimeout(contestStart, msToContestStart);
}
else
{
	console.log("Contest already started today.");
}


function Storage()
{
	return localStorage.HHAuto_Setting_settPerTab==="true"?sessionStorage:localStorage;
}

function contestEnd()
{
	console.log("Contest ends now ! Setting default values.");

	Storage().HHAuto_Setting_autoQuestThreshold = autoQuestDefaultThreshold;
	Storage().HHAuto_Setting_autoTrollThreshold = autoTrollDefaultThreshold;
	Storage().HHAuto_Setting_autoSeasonThreshold = autoSeasonDefaultThreshold;
	Storage().HHAuto_Setting_autoLeaguesThreshold = autoLeaguesDefaultThreshold;
	Storage().HHAuto_Setting_autoChamps = "false";
	Storage().HHAuto_Setting_autoMissionC = "false";

	document.getElementById("autoQuestThreshold").value = autoQuestDefaultThreshold;
	document.getElementById("autoTrollThreshold").value = autoTrollDefaultThreshold;
	document.getElementById("autoSeasonThreshold").value = autoSeasonDefaultThreshold;
	document.getElementById("autoLeaguesThreshold").value = autoLeaguesDefaultThreshold;
	document.getElementById("autoChamps").checked = false;
	document.getElementById("autoMissionCollect").checked = false;
}

function contestStart()
{
	console.log("New contest starting now ! Mission collect set to "+autoMissionCollectDefault);
	Storage().HHAuto_Setting_autoMissionC = autoMissionCollectDefault;
	document.getElementById("autoMissionCollect").checked = autoMissionCollectDefault;
}

function useAllLeague()
{
	console.log("Setting league threshold to 0.");
	Storage().HHAuto_Setting_autoLeaguesThreshold = "0";
	document.getElementById("autoLeaguesThreshold").value = "0";
}

function useAllSeason()
{
	console.log("Setting season threshold to 0.");
	Storage().HHAuto_Setting_autoSeasonThreshold = "0";
	document.getElementById("autoSeasonThreshold").value = "0";
}