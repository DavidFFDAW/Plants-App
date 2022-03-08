export function ContentContainer ({ title = 'LISTADO', children }) {
    return (
        <div className="flex center">
            <div className="content-container">
                <div className="">
                    <div className="col-12">
                            <h1>{title}</h1>
                    </div>
                    
                    {children}
                </div>
            </div>
        </div>
    );
}