import React from 'react';
import {useTranslation} from "react-i18next";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons";
import Datapoint from "../Datapoint";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormattedTime from "../text/FormattedTime.jsx";
import {isNumber} from "../../util/isNumber.js";

const CurrentUptime = ({uptime}) => {
    const {t} = useTranslation();

    const infoBubble = uptime === 'plugin.generic.unavailable'
        ? <FontAwesomeIcon icon={faQuestionCircle} title={t('html.description.noUptimeCalculation')}/>
        : undefined;

    return (
        <Datapoint icon={faPowerOff} color={'light-green'}
                   name={t('html.label.currentUptime')}
                   value={isNumber(uptime) && <FormattedTime timeMs={uptime}/> || uptime} valueLabel={infoBubble}/>
    )
};

export default CurrentUptime