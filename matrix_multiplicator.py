
import math
def matrix_multiply(A, B):
    # Get dimensions
    rows_A, cols_A = len(A), len(A[0])
    rows_B, cols_B = len(B), len(B[0])

    # Check if multiplication is possible
    if cols_A != rows_B:
        raise ValueError("Matrix dimensions do not match for multiplication.")

    # Initialize result matrix with zeros
    result = [[0 for _ in range(cols_B)] for _ in range(rows_A)]

    # Perform matrix multiplication
    for i in range(rows_A):
        for j in range(cols_B):
            for k in range(cols_A):
                result[i][j] += A[i][k] * B[k][j]
    
    return result

# Test the function
if __name__ == "__main__":
    # Example matrices
    A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    B = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]
        
    try:
        # Multiply A and B
        result=matrix_multiply(A, B)
        # Print the result
        print("Resultant Matrix:")
        for row in result:
            print(row)
    except ValueError as e:
        print(e)
