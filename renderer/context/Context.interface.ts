export interface StatefulContext<T> {
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>
}