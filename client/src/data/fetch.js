export const fetchPostEntry = (entry) => {
    try {
        fetch(`/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });
    } catch (error) {
        console.log(error);
    }
};

export const fetchDeleteTasks = (idArray) => {
    for (let i = 0; i < idArray.length; i++) {
        try {
            fetch(`/tasks/${idArray[i]}`, {
                method: 'delete'
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export const fetchPutEntry = (entry) => {
    try {
        fetch(`/tasks/${entry.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });
    } catch (error) {
        console.log(error);
    }
};

export const fetchGetEntries = async () => {
    try {
        const data = await fetch('/tasks');
        const jsonData = await data.json();
        return jsonData;
    } catch (error) {
        console.log(error);
    }
};
