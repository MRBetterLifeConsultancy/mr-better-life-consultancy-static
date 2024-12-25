var page_no = 1;

function searchUniversities(ev, e = null)
{
    ev.preventDefault();
    enableDisableDiv('#quickForm', false);
    var region = $('#quickForm').find('[name="region"]').val();
    window.location.href = 'view_university_'+ region +'_'+ page_no +'.html';
}

function getPage(ev, e)
{
    page_no = $(e).data('page_no');
    page_no += 1;
    searchUniversities(ev);
}

function getRegionList(ev, e)
{
    page_no = 1;
    searchUniversities(ev);
}