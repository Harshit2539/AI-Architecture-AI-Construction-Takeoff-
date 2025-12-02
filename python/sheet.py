import pandas as pd

file_path = r"C:\Users\syste\Downloads\AI_Architecture - BCBP\python\BOQ Master Draft_16May2025.xlsx"

excel = pd.ExcelFile(file_path)
cleaned_data = {}

for sheet_name in excel.sheet_names:
    print(f"\n=== Cleaning Sheet: {sheet_name} ===")

    df = excel.parse(sheet_name, header=None)
    df = df.dropna(how="all")  # drop completely empty rows
    df = df.reset_index(drop=True)  # reset index after drop

    # Detect header row automatically
    header_row_idx = None
    for i in range(min(10, len(df))):
        if df.iloc[i].astype(str).str.contains("Class|Ref|Des|Number|Name", case=False, regex=True).any():
            header_row_idx = i
            break

    if header_row_idx is not None:
        df.columns = df.iloc[header_row_idx]
        df = df.drop(index=list(range(0, header_row_idx + 1)), errors="ignore")
    else:
        df.columns = [f"col_{i}" for i in range(df.shape[1])]

    df = df.dropna(how="all", axis=1).reset_index(drop=True)
    cleaned_data[sheet_name] = df

    print(df.head(5))

# Save to single cleaned Excel
with pd.ExcelWriter("cleaned_output.xlsx") as writer:
    for name, data in cleaned_data.items():
        data.to_excel(writer, sheet_name=name, index=False)

print("\n✅ Cleaned version saved as cleaned_output.xlsx")
