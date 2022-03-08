export function ContentContainer ({ title = 'LISTADO', center = true, extraCss = {}, children }) {
    return (
        <div className={`flex ${center}`}>
            <div className="content-container" style={extraCss}>
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