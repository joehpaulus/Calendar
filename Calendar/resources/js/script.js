function updateLocationOptions(){

}

function saveEvent() {
    const eventDetails = {
        name: document.getElementById("event_name").value, // Get value from the input field
        weekday: document.getElementById("event_weekday").value,
        time: document.getElementById("event_time").value,
        modality: document.getElementById("event_modality").value,
        location: document.getElementById("event_modality").value === "In-Person" ? document.getElementById("event_location").value : null,
        remote_url: document.getElementById("event_modality").value === "Remote" ? document.getElementById("event_remote_url").value : null,
        attendees: document.getElementById("event_attendees").value
    }
    console.log("Event Details:", eventDetails);
}

function addEventToCalendarUI() {
    
}
