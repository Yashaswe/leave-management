const LeaveReq = () => {
  return (
    <div className="leaveReqForm">
      <h1 className="title">Leave Request Form</h1>
      <form>
        <label> Leave Type </label>
        <div className="select">
          <select name="leave_type" id="leave_type" className="leave_type">
            <option value="sick_leave">Sick Leave</option>
            <option value="annual_leave">Annual Leave</option>
            <option value="other">Other</option>
          </select>
        </div>
        <label>Duration </label>
        <input type="text"></input>
        <label> Cause</label>
        <textarea name="cause"></textarea>
        <div className="leaveReqForm_button">
          <button className="btn_leaveReq">Request Leave</button>
          <button className="btn_cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default LeaveReq;
