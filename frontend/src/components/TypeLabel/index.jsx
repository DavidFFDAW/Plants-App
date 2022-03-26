export function TypeLabel ({ type }) {
    return (
        <div className={`plant-type-label ${type}`} style={{ margin: '10px 0' }}>{type}</div>
    );
}