/*

MENU CODE

Layer 1:

s => main menu for student, () => {sa, sr, ss}
p => main menu for parent,  () => {pa, pr, ps}

Layer 2:

            STUDENT                           |           PARENT
sa => activity              () => {}          |   pa => activity       () => {}
sr => request               () => {srn, src}  |   pr => request        (Pending Request) => {pra, id}
ss => setting               () => {}          |   ps => setting            () => {}

Layer 3:

            STUDENT                                |           PARENT
srn => new request          () => {new request}    |   prr => review request  (Request) => {accept, id}
src => create request       (Pending Request) => {srcc, id}     |
sra => abort request

Layer 4:

            STUDENT                                |           PARENT
srcc => create request confirm                     |   prra => action on pending request
srac => abort request confirm

*/

module.exports = {
    'p': require('./p'),
    'pa': require('./pa'),
    'pr': require('./pr'),
    'prr': require('./prr'),
    'prra': require('./prra'),
    'ps': require('./ps'),
    's': require('./s'),
    'sa': require('./sa'),
    'sr': require('./sr'),
    'sra': require('./sra'),
    'srac': require('./srac'),
    'srcc': require('./srcc'),
    'srcfh': require('./srcfh'),
    'srcfm': require('./srcfm'),
    'srcr': require('./srcr'),
    'srcth': require('./srcth'),
    'srctm': require('./srctm'),
    'ss': require('./ss'),
    'done_request': require('./done_request'),
    'done_abort': require('./done_abort'),
    'done_review': require('./done_review'),
}