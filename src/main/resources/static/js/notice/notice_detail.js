/** common **/
'use strict';

/** onload **/
$(function(){
    getBoardDetail();
});

function getBoardDetail(){
    let link = document.location.href;
    let seqNo = link.substring(link.length-1, link.length);

    ajaxCall({
        method : 'GET', 
        url : '/admin/boardDetail/' + seqNo, 
        success : showBoardDetail
    });
}

function showBoardDetail(object){
    let BOARD_DETAIL_HTML = '';

    BOARD_DETAIL_HTML += '<tr>';
    BOARD_DETAIL_HTML += '  <td class="notice_detail_title">'+object.bultTitlNm+'</td>'
    BOARD_DETAIL_HTML += '</tr>';

    BOARD_DETAIL_HTML += '<tr>';
    BOARD_DETAIL_HTML += '  <td class="notice_detail_info">' 
    BOARD_DETAIL_HTML += '      <ul>';
    BOARD_DETAIL_HTML += '          <li class="notice_detail_line">'+object.rgmnNm+'</li>';
    BOARD_DETAIL_HTML += '          <li>'+object.rgDtm.substring(0, 11)+'</li>';
    BOARD_DETAIL_HTML += '      </ul>';
    BOARD_DETAIL_HTML += '  </td>';
    
    BOARD_DETAIL_HTML += '</tr>';
    BOARD_DETAIL_HTML += '<tr>';
    BOARD_DETAIL_HTML += '  <td  class="notice_detail_desc">'+object.brcn+'</td>'
    BOARD_DETAIL_HTML += '</tr>';

    $('.notice_detail > table > tbody').html(BOARD_DETAIL_HTML);
}