module.exports = async (previous) => {

    let text = `<b>Choose Your Reason</b>`;

    let inline_keyboard = [];

    const reasons = [
        'Go Eating',
        'Buying Stuff',
        'Buying Medicine',
        'Workout, playing Games',
        'Go for a walk',
        'Having a Party',
        'OTHER'
    ];

    reasons.forEach(reason => {
        inline_keyboard.push([
            {
                text: reason,
                callback_data: `srcc,${previous}+${reason}`,
            },
        ]);
    });

    inline_keyboard.push([
        {
            text: '<< Cancel',
            callback_data: 'sr,0',
        },
    ]);

    return {text, reply_markup: {inline_keyboard}}

}