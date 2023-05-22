using System.Linq.Expressions;

namespace API.ViewModels;

public abstract class EntityModel<TKey>
{
    public TKey Key { get; set; }

    public void Expand(string property)
    {
        var type = this.GetType();
        var propertyInfo = type.GetProperty(property);

        if (propertyInfo == null)
        {
            throw new ArgumentException("Property does not exist.", nameof(property));
        }

        var value = propertyInfo.GetValue(this);

        if (value is IExpandable expandable)
        {
            expandable.Expanded = true;
        }
        else
        {
            throw new ArgumentException("Property is not expandable.", nameof(property));
        }
    }
} 