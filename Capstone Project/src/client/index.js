import "./styles/style.scss";

import { handleSubmit } from "./scripts/handleSubmit";
import { validateUserInput } from "./scripts/validateUserInput";
import { postData } from "./scripts/postData";
import { calculateRemainingDays } from "./scripts/calculateRemainingDays";
import { updateUI } from "./scripts/updateUI";
import { saveTrip } from "./scripts/saveTrip";
import { removeTrip } from "./scripts/removeTrip";
import { renderSavedTrips } from "./scripts/renderSavedTrips";

export {
    handleSubmit,
    validateUserInput,
    postData,
    calculateRemainingDays,
    updateUI,
    saveTrip,
    removeTrip,
    renderSavedTrips,
};
