// Function to update visibility of location and remote URL fields
function updateLocationOptions(modality) {
    const locationField = document.getElementById("location_field");
    const remoteUrlField = document.getElementById("remote_url_field");

    if (modality === "In-Person") {
        locationField.style.display = "block";
        remoteUrlField.style.display = "none";
    } else if (modality === "Remote") {
        locationField.style.display = "none";
        remoteUrlField.style.display = "block";
    }
}


// Function to validate event form
function validateEventForm() {
    let isValid = true;
    let errorMessage = "";

    const eventName = document.getElementById("event_name").value.trim();
    const weekday = document.getElementById("event_weekday").value;
    const time = document.getElementById("event_time").value;
    const modality = document.getElementById("event_modality").value;
    const location = document.getElementById("event_location").value.trim();
    const remoteUrl = document.getElementById("event_remote_url").value.trim();
    const attendees = document.getElementById("event_attendees").value.trim();

    // Validate event name
    if (eventName === "") {
        errorMessage += "Event name is required.\n";
        isValid = false;
    }

    // Validate weekday selection
    if (!weekday || weekday === "") {
        errorMessage += "Please select a weekday.\n";
        isValid = false;
    }

    // Validate time selection
    if (!time || time === "") {
        errorMessage += "Please select a time for the event.\n";
        isValid = false;
    }

    // Validate location for in-person events
    if (modality === "In-Person" && location === "") {
        errorMessage += "Please enter the event location.\n";
        isValid = false;
    }

    // Validate remote URL for online events
    if (modality === "Remote") {
        if (remoteUrl === "") {
            errorMessage += "Please enter a meeting link.\n";
            isValid = false;
        } 
        const urlPattern = /^(https?:\/\/)?([^\s\/]+?\.[^\s\/]+)(\/[^\s]*)?$/;
        if (!urlPattern.test(remoteUrl)) {
        errorMessage += "Please enter a valid Remote URL starting with http: or https: \n";
        isValid = false;
        }
    }

    // Show alert if form is invalid
    if (!isValid) {
        alert(errorMessage);
    }

    return isValid; // Return validation status
}

// Function to save event details after validation
function saveEvent() {
    if (!validateEventForm()) return; // Stop if validation fails

    const eventDetails = {
        name: document.getElementById("event_name").value.trim(),
        weekday: document.getElementById("event_weekday").value,
        time: document.getElementById("event_time").value,
        modality: document.getElementById("event_modality").value,
        location: document.getElementById("event_modality").value === "In-Person" 
                    ? document.getElementById("event_location").value.trim() 
                    : null,
        remote_url: document.getElementById("event_modality").value === "Remote" 
                    ? document.getElementById("event_remote_url").value.trim() 
                    : null,
        attendees: document.getElementById("event_attendees").value.trim(),
        category: document.getElementById("event_category").value.trim()
    };

    console.log("Event Details:", eventDetails);
    alert("Event saved successfully!");

    addEventToCalendarUI(eventDetails);

    // Reset the form here after successful save
    document.getElementById("event_form").reset();

    // Ensure correct visibility of location/remote URL fields after reset
    updateLocationOptions(document.getElementById("event_modality").value);
}


function addEventToCalendarUI(eventDetails) 
{
    let event_card = createEventCard(eventDetails);
    let day = document.getElementById("event_weekday").value;
    let dayContainer = document.getElementById(day);

    if (dayContainer) {
        dayContainer.appendChild(event_card);
    } else {
        console.error("Error: Could not find the div for weekday:", day);
    }
}
function createEventCard(eventDetails) 
{
    let event_element = document.createElement('div');
    event_element.classList = 'event row border rounded m-1 py-1';

    category(event_element, eventDetails.category)

    let info = document.createElement('div');
    let name = eventDetails.name;
    info.innerHTML = 
    `<strong>Event Name:</strong> ${eventDetails.name}<br>
    <strong>Event Time:</strong> ${eventDetails.time}<br>
    <strong>Event Modality:</strong> ${eventDetails.modality}<br>
    <strong>Event Location:</strong> ${eventDetails.location}<br>
    <strong>Remote_URL:</strong> ${eventDetails.remote_url}<br>
    <strong>Attendees:</strong>${eventDetails.attendees}`;

    event_element.appendChild(info);
    return event_element;
}

function category(event_element, category)
{
    let modal = document.getElementById("event_modal");

    event_element.classList.remove("bg-info", "bg-success", "bg-warning");
    if (category == "Academic")
    {
        event_element.classList.add("bg-info");
    }
    else if (category == "Work")
    {
        event_element.classList.add("bg-success");
    }
    else if(category == "Personal")
    {
        event_element.classList.add("bg-warning");
    }
}