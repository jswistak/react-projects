function GameAdmin(props: any){
    return (
        <div className="gameadmin">
            <label>Name of the player:</label>
            <input type="text" id="pname" name="pname"
             onChange={props.onChangeHandler} value={props.name}/><br/>
            
        </div>
    );
    
}

export default GameAdmin;