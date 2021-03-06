import { formValidation } from "./formValidation";
import { updateUI } from './updateUI';

async function main(event) {
    event.preventDefault();

    let current_city = document.getElementById('curr_place').value;
    let destination_city = document.getElementById('destination').value;
    let dep_time = document.getElementById('date_from').value;
    let ret_time = document.getElementById('date_return').value;
    let dyn_cont = document.getElementById('dyn_all');

    let valid = formValidation(current_city, destination_city, dep_time, ret_time);
    if (!valid)
        return;

    let newCard;

    const api_response = await fetch("/results", {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({destination: destination_city,
                                    current_city: current_city,
                                    departure_time: dep_time,
                                    return_time: ret_time})
    });
    try {
        const data = await api_response.json();
        console.log('client = ', data);
        newCard = updateUI(data);
        dyn_cont.prepend(newCard);
    } catch (error) {
        console.log('error', error);
    }
}

export { main }