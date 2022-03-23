/** common **/
'use strict';

/** onload **/
$(function(){
    let link = document.location.href;
    let seqNo = link.substring(link.length-1, link.length);

    getBoardDetail(seqNo);

    $(document).on('click', '#modifyBoard', function(){
        location.href = '/admin/noticeWrite?seqNo='+seqNo;
    })
});

var getBoardDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/admin/boardDetail/' + seqNo, 
        success : getBoardDetailCB
    });
}

var getBoardDetailCB = function(object){
    let BOARD_DETAIL_HTML = '';

    BOARD_DETAIL_HTML += '<tr>';
    BOARD_DETAIL_HTML += '  <td class="notice_detail_title">'+object.bultTitlNm+'</td>'         // 제목
    BOARD_DETAIL_HTML += '</tr>';

    BOARD_DETAIL_HTML += '<tr>';
    BOARD_DETAIL_HTML += '  <td class="notice_detail_info">' 
    BOARD_DETAIL_HTML += '      <ul>';
    BOARD_DETAIL_HTML += '          <li class="notice_detail_line">'+object.rgmnNm+'</li>';     // 작성자
    BOARD_DETAIL_HTML += '          <li>'+object.rgDtm.substring(0, 11)+'</li>';                // 작성일
    BOARD_DETAIL_HTML += '      </ul>';
    BOARD_DETAIL_HTML += '  </td>';
    
    BOARD_DETAIL_HTML += '</tr>';
    BOARD_DETAIL_HTML += '<tr>';
    BOARD_DETAIL_HTML += '  <td  class="notice_detail_desc">'+object.brcn+'</td>'               // 글 내용
    BOARD_DETAIL_HTML += '</tr>';

    $('.notice_detail > table > tbody').html(BOARD_DETAIL_HTML);
}